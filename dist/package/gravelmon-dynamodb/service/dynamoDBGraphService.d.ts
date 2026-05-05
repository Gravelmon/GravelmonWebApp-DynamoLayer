import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoEdge, DynamoItem, DynamoNode, PK, SK } from "./dynamoNodes";
import { CheckOptionalClientConfig } from "@smithy/types/dist-types/client";
export declare class DynamoDBGraphService {
    private baseClient;
    private documentClient;
    private tableName;
    constructor(tableName: string, config?: CheckOptionalClientConfig<DynamoDBClientConfig>);
    tableExists(): Promise<boolean>;
    queryPartition(pk: PK): Promise<any[]>;
    queryByPKAndSKPrefix(pk: PK, skPrefix: string): Promise<any[]>;
    queryByEntityType(entityType: string): Promise<any[]>;
    getNode(pk: PK, sk?: SK): Promise<DynamoNode | null>;
    getNodesByType<T extends DynamoNode>(entityType: string): Promise<T[]>;
    batchGetNodes(pks: PK[]): Promise<DynamoNode[]>;
    getEdges<T extends DynamoEdge>(pk: PK): Promise<T[]>;
    getEdgesByType(pk: PK, edgeType: string): Promise<DynamoEdge[]>;
    putItem(item: DynamoItem): Promise<void>;
    batchPutItems(items: DynamoItem[]): Promise<void>;
    private deserializeItems;
    private deserializeItem;
}
