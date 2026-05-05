"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestEnv = createTestEnv;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoDBGraphService_1 = require("../gravelmon-dynamodb/service/dynamoDBGraphService");
const tableName = process.env.DYNAMODB_TABLE ||
    `TestGraphTable-${Date.now()}-${Math.random().toString(36).slice(2)}`;
function createTestEnv(testName) {
    const tableName = `TestGraphTable_${testName}_${Date.now()}`;
    const client = new client_dynamodb_1.DynamoDBClient();
    async function createTable() {
        await client.send(new client_dynamodb_1.CreateTableCommand({
            TableName: tableName,
            KeySchema: [
                { AttributeName: "PK", KeyType: "HASH" },
                { AttributeName: "SK", KeyType: "RANGE" }
            ],
            AttributeDefinitions: [
                { AttributeName: "PK", AttributeType: "S" },
                { AttributeName: "SK", AttributeType: "S" },
                { AttributeName: "entityType", AttributeType: "S" }
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: "GSI1-EntityType",
                    KeySchema: [
                        { AttributeName: "entityType", KeyType: "HASH" }
                    ],
                    Projection: { ProjectionType: "ALL" }
                }
            ],
            BillingMode: "PAY_PER_REQUEST"
        }));
        await waitForActive();
    }
    async function waitForActive() {
        for (let i = 0; i < 30; i++) {
            const res = await client.send(new client_dynamodb_1.DescribeTableCommand({ TableName: tableName }));
            if (res.Table?.TableStatus === "ACTIVE")
                return;
            await new Promise(r => setTimeout(r, 300));
        }
        throw new Error("Table creation timeout");
    }
    async function destroy() {
        await client.send(new client_dynamodb_1.DeleteTableCommand({ TableName: tableName }));
    }
    const service = new dynamoDBGraphService_1.DynamoDBGraphService(tableName);
    return {
        tableName,
        client,
        service,
        createTable,
        destroy
    };
}
