"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBGraphService = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamoNodes_1 = require("./dynamoNodes");
const deserializerRegistry_1 = require("./deserializerRegistry");
const lib_dynamodb_2 = require("@aws-sdk/lib-dynamodb");
class DynamoDBGraphService {
    constructor(tableName, config) {
        this.baseClient = new client_dynamodb_1.DynamoDBClient(config ? config : {
            endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
            region: "us-east-1",
            credentials: {
                accessKeyId: "dummy",
                secretAccessKey: "dummy"
            }
        });
        this.documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(this.baseClient, {
            marshallOptions: {
                removeUndefinedValues: true
            }
        });
        this.tableName = tableName;
    }
    async tableExists() {
        try {
            const command = new client_dynamodb_1.DescribeTableCommand({ TableName: this.tableName });
            await this.baseClient.send(command);
        }
        catch (error) {
            if (error.name === "ResourceNotFoundException") {
                return false;
            }
            else {
                throw error;
            }
        }
        return true;
    }
    // ---------- Core Queries ----------
    async queryPartition(pk) {
        const input = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": pk
            }
        };
        const result = await this.documentClient.send(new lib_dynamodb_1.QueryCommand(input));
        return this.deserializeItems(result.Items ?? []);
    }
    async queryByPKAndSKPrefix(pk, skPrefix) {
        const input = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":sk": skPrefix
            }
        };
        const result = await this.documentClient.send(new lib_dynamodb_1.QueryCommand(input));
        return this.deserializeItems(result.Items ?? []);
    }
    // ---------- Table Setup -----------
    async queryByEntityType(entityType) {
        const result = await this.baseClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: this.tableName,
            IndexName: "GSI1-EntityType",
            KeyConditionExpression: "entityType = :type",
            ExpressionAttributeValues: {
                ":type": entityType
            }
        }));
        return this.deserializeItems(result.Items ?? []);
    }
    // ---------- Nodes ----------
    async getNode(pk, sk = "METADATA") {
        const items = await this.queryByPKAndSKPrefix(pk, sk);
        return items.find(i => i instanceof dynamoNodes_1.DynamoNode) ?? null;
    }
    async getNodesByType(entityType) {
        const items = await this.queryByEntityType(entityType);
        return items.filter((i) => i instanceof dynamoNodes_1.DynamoNode);
    }
    async batchGetNodes(pks) {
        const keys = pks.map(pk => ({
            PK: pk,
            SK: "METADATA"
        }));
        let requestItems = {
            [this.tableName]: { Keys: keys }
        };
        const results = [];
        do {
            const response = await this.documentClient.send(new lib_dynamodb_1.BatchGetCommand({ RequestItems: requestItems }));
            const items = response.Responses?.[this.tableName] ?? [];
            results.push(...items
                .map(item => this.deserializeItem(item))
                .filter((i) => i instanceof dynamoNodes_1.DynamoNode));
            requestItems = response.UnprocessedKeys ?? {};
        } while (Object.keys(requestItems).length > 0);
        return results;
    }
    // ---------- Edges ----------
    async getEdges(pk) {
        const items = await this.queryByPKAndSKPrefix(pk, "EDGE#");
        return items.filter((i) => i instanceof dynamoNodes_1.DynamoEdge);
    }
    async getEdgesByType(pk, edgeType) {
        const prefix = `EDGE#${edgeType}#`;
        const items = await this.queryByPKAndSKPrefix(pk, prefix);
        return items.filter((i) => i instanceof dynamoNodes_1.DynamoEdge);
    }
    // ---------- Writes ----------
    async putItem(item) {
        await this.documentClient.send(new lib_dynamodb_1.PutCommand({
            TableName: this.tableName,
            Item: item.serialize()
        }));
    }
    async batchPutItems(items) {
        const MAX_BATCH_SIZE = 25;
        // Split into chunks of 25
        const chunks = [];
        for (let i = 0; i < items.length; i += MAX_BATCH_SIZE) {
            chunks.push(items.slice(i, i + MAX_BATCH_SIZE));
        }
        for (const chunk of chunks) {
            let requestItems = {
                [this.tableName]: chunk.map(item => ({
                    PutRequest: {
                        Item: item.serialize()
                    }
                }))
            };
            do {
                const response = await this.documentClient.send(new lib_dynamodb_2.BatchWriteCommand({
                    RequestItems: requestItems
                }));
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
    deserializeItems(items) {
        return items.map(item => this.deserializeItem(item));
    }
    deserializeItem(item) {
        const type = item.entityType;
        const itemType = item.TYPE;
        if (!type) {
            throw new Error("Missing entityType on item");
        }
        return deserializerRegistry_1.deserializerRegistry.deserialize(type, itemType, item);
    }
}
exports.DynamoDBGraphService = DynamoDBGraphService;
