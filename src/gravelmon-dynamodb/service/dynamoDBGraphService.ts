import {
    DynamoDBClient,
    DescribeTableCommand
} from "@aws-sdk/client-dynamodb";
import {
    BatchGetCommand,
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    QueryCommandInput
} from "@aws-sdk/lib-dynamodb";
import {DynamoEdge, DynamoItem, DynamoNode, ItemType, PK, SK} from "./dynamoNodes";
import {deserializerRegistry} from "./deserializerRegistry";
import {BatchWriteCommand} from "@aws-sdk/lib-dynamodb";

export class DynamoDBGraphService {
    private baseClient: DynamoDBClient;
    private documentClient: DynamoDBDocumentClient;
    private tableName: string;

    constructor(tableName: string) {
        let config = process.env.isLocal ? {
                endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
                region: "us-east-1",
                credentials: {
                    accessKeyId: "dummy",
                    secretAccessKey: "dummy"
                }
            }
            : {}
        this.baseClient = new DynamoDBClient(config);
        this.documentClient = DynamoDBDocumentClient.from(this.baseClient, {
            marshallOptions: {
                removeUndefinedValues: true
            }
        });
        this.tableName = tableName;
    }

    public async tableExists(): Promise<boolean> {
        try {
            const command = new DescribeTableCommand({TableName: this.tableName});
            await this.baseClient.send(command);
        } catch (error: any) {
            if (error.name === "ResourceNotFoundException") {
                return false;
            } else {
                throw error;
            }
        }
        return true;
    }

    // ---------- Core Queries ----------

    async queryPartition(pk: PK): Promise<any[]> {
        const input: QueryCommandInput = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": pk
            }
        };

        const result = await this.documentClient.send(new QueryCommand(input));
        return this.deserializeItems(result.Items ?? []);
    }

    async queryByPKAndSKPrefix(pk: PK, skPrefix: string): Promise<any[]> {
        const input: QueryCommandInput = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":sk": skPrefix
            }
        };

        const result = await this.documentClient.send(new QueryCommand(input));
        return this.deserializeItems(result.Items ?? []);
    }

    // ---------- Table Setup -----------

    async queryByEntityType(entityType: string) {
        const result = await this.baseClient.send(
            new QueryCommand({
                TableName: this.tableName,
                IndexName: "GSI1-EntityType",
                KeyConditionExpression: "entityType = :type",
                ExpressionAttributeValues: {
                    ":type": entityType
                }
            })
        );

        return this.deserializeItems(result.Items ?? []);
    }

    // ---------- Nodes ----------

    async getNode(pk: PK, sk: SK = "METADATA"): Promise<DynamoNode | null> {
        const items = await this.queryByPKAndSKPrefix(pk, sk);
        return items.find(i => i instanceof DynamoNode) ?? null;
    }

    async getNodesByType<T extends DynamoNode>(entityType: string): Promise<T[]> {
        const items = await this.queryByEntityType(entityType);
        return items.filter((i): i is T => i instanceof DynamoNode);
    }

    async batchGetNodes(pks: PK[]): Promise<DynamoNode[]> {
        const keys = pks.map(pk => ({
            PK: pk,
            SK: "METADATA"
        }));

        let requestItems: Record<string, any> = {
            [this.tableName]: {Keys: keys}
        };

        const results: DynamoNode[] = [];

        do {
            const response = await this.documentClient.send(
                new BatchGetCommand({RequestItems: requestItems})
            );

            const items = response.Responses?.[this.tableName] ?? [];

            results.push(
                ...items
                    .map(item => this.deserializeItem(item))
                    .filter((i): i is DynamoNode => i instanceof DynamoNode)
            );

            requestItems = response.UnprocessedKeys ?? {};
        } while (Object.keys(requestItems).length > 0);

        return results;
    }

    // ---------- Edges ----------

    async getEdges<T extends DynamoEdge>(pk: PK): Promise<T[]> {
        const items = await this.queryByPKAndSKPrefix(pk, "EDGE#");
        return items.filter((i): i is T => i instanceof DynamoEdge);
    }

    async getEdgesByType(pk: PK, edgeType: string): Promise<DynamoEdge[]> {
        const prefix = `EDGE#${edgeType}#`;
        const items = await this.queryByPKAndSKPrefix(pk, prefix);
        return items.filter((i): i is DynamoEdge => i instanceof DynamoEdge);
    }

    // ---------- Writes ----------

    async putItem(item: DynamoItem): Promise<void> {
        await this.documentClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: item.serialize()
            })
        );
    }

    async batchPutItems(items: DynamoItem[]): Promise<void> {
        const MAX_BATCH_SIZE = 25;

        // Split into chunks of 25
        const chunks: DynamoItem[][] = [];
        for (let i = 0; i < items.length; i += MAX_BATCH_SIZE) {
            chunks.push(items.slice(i, i + MAX_BATCH_SIZE));
        }

        for (const chunk of chunks) {
            let requestItems: Record<string, any> = {
                [this.tableName]: chunk.map(item => ({
                    PutRequest: {
                        Item: item.serialize()
                    }
                }))
            };

            do {
                const response = await this.documentClient.send(
                    new BatchWriteCommand({
                        RequestItems: requestItems
                    })
                );

                requestItems = response.UnprocessedItems ?? {};

                // Optional but recommended: small delay to avoid hot looping
                let attempt = 0;

                if (Object.keys(requestItems).length > 0) {
                    const delay = Math.min(1000, 50 * Math.pow(2, attempt++));
                    await new Promise(res => setTimeout(res, delay));
                }

            } while (Object.keys(requestItems).length > 0);
        }
    }

    // ---------- Deserialization ----------

    private deserializeItems(items: Record<string, any>[]): any[] {
        return items.map(item => this.deserializeItem(item));
    }

    private deserializeItem(item: Record<string, any>): any {
        const type = item.entityType;
        const itemType = item.TYPE;

        if (!type) {
            throw new Error("Missing entityType on item");
        }

        return deserializerRegistry.deserialize(type, itemType as ItemType, item);
    }
}