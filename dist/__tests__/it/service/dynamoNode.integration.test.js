"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../testEnv");
const dynamoNodes_1 = require("../../../gravelmon-dynamodb/service/dynamoNodes");
const tableName = process.env.DYNAMODB_TABLE ||
    `TestGraphTable-${Date.now()}-${Math.random().toString(36).slice(2)}`;
let dynamoClient;
let service;
let env;
beforeAll(async () => {
    env = (0, testEnv_1.createTestEnv)("game-node");
    await env.createTable();
    service = env.service;
    dynamoClient = env.client;
});
afterAll(async () => {
    env.destroy();
});
describe("DynamoNode", () => {
    it("should serialize and deserialize a DynamoNode correctly", async () => {
        // Arrange
        const node = new dynamoNodes_1.DynamoNode("TestEntity", "test-name", 2, 123456);
        const pk = node.PK;
        // Act
        await service.putItem(node);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode.PK).toBe(node.PK);
        expect(readNode.SK).toBe("METADATA");
        expect(readNode.TYPE).toBe("NODE");
        expect(readNode.entityType).toBe("TestEntity");
        expect(readNode.name).toBe("test-name");
        expect(readNode.version).toBe(2);
        expect(readNode.lastEdited).toBe(123456);
    });
});
describe("DynamoEdge", () => {
    it("should serialize and deserialize an edge correctly", async () => {
        // Arrange
        const sourcePk = (0, dynamoNodes_1.getNodePK)("User", "A");
        const edge = new dynamoNodes_1.DynamoEdge(sourcePk, "FRIEND", "User", "B", 3, 999999);
        // Act
        await service.putItem(edge);
        const results = await service.queryByPKAndSKPrefix(sourcePk, "EDGE#FRIEND");
        const readEdge = results[0];
        // Assert
        expect(readEdge).not.toBeNull();
        expect(readEdge.PK).toBe(sourcePk);
        expect(readEdge.SK).toBe("EDGE#FRIEND#User#B");
        expect(readEdge.TYPE).toBe("EDGE");
        expect(readEdge.entityType).toBe("FRIEND");
        expect(readEdge.target).toBe((0, dynamoNodes_1.getNodePK)("User", "B"));
        expect(readEdge.sourceType).toBe("User");
        expect(readEdge.targetType).toBe("User");
        expect(readEdge.version).toBe(3);
        expect(readEdge.lastEdited).toBe(999999);
    });
    it("should correctly derive target and types from SK", async () => {
        // Arrange
        const sourcePk = (0, dynamoNodes_1.getNodePK)("Pokemon", "Pikachu");
        const edge = new dynamoNodes_1.DynamoEdge(sourcePk, "HAS_TYPE", "Type", "Electric");
        // Act
        await service.putItem(edge);
        const results = await service.queryByPKAndSKPrefix(sourcePk, "EDGE#HAS_TYPE");
        const readEdge = results[0];
        // Assert
        expect(readEdge.target).toBe((0, dynamoNodes_1.getNodePK)("Type", "Electric"));
        expect(readEdge.sourceType).toBe("Pokemon");
        expect(readEdge.targetType).toBe("Type");
    });
});
