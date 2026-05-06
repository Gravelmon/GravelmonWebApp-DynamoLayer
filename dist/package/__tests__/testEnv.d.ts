import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GravelmonDynamoDBService } from "../gravelmon-dynamodb";
export declare function createTestEnv(testName: string): {
    tableName: string;
    client: DynamoDBClient;
    service: GravelmonDynamoDBService;
    createTable: () => Promise<void>;
    destroy: () => Promise<void>;
};
