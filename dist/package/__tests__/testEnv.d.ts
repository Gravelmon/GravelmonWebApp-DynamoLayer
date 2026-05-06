import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBGraphService } from "../gravelmon-dynamodb";
export declare function createTestEnv(testName: string): {
    tableName: string;
    client: DynamoDBClient;
    service: DynamoDBGraphService;
    createTable: () => Promise<void>;
    destroy: () => Promise<void>;
};
