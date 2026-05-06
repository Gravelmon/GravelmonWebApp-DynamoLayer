import { DynamoEdge, DynamoItem, DynamoNode, PK, SK } from "./dynamoNodes";
export declare function getDynamoConfig(): {
    endpoint?: undefined;
    region?: undefined;
    credentials?: undefined;
} | {
    endpoint: string;
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
};
export declare class GravelmonDynamoDBService {
    private baseClient;
    private documentClient;
    private tableName;
    constructor(tableName: string);
    tableExists(): Promise<boolean>;
    queryPartition(pk: PK): Promise<any[]>;
    queryByPKAndSKPrefix(pk: PK, skPrefix: string): Promise<any[]>;
    queryByEntityType(entityType: string): Promise<any[]>;
    getNode(pk: PK, sk?: SK): Promise<DynamoNode | null>;
    getNodesByType<T extends DynamoNode>(entityType: string): Promise<T[]>;
    batchGetNodes(pks: PK[]): Promise<DynamoNode[]>;
    getEdges<T extends DynamoEdge>(pk: PK): Promise<T[]>;
    getEdgesByType(pk: PK, edgeType: string): Promise<DynamoEdge[]>;
    putItem(item: DynamoItem): Promise<DynamoItem>;
    batchPutItems(items: DynamoItem[]): Promise<DynamoItem[]>;
    private deserializeItems;
    private deserializeItem;
}
