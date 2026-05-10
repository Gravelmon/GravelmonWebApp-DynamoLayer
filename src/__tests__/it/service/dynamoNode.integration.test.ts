import { GravelmonDynamoDBService } from "../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../testEnv";
import { DynamoNode } from "../../../gravelmon-dynamodb/service/dynamoNodes";
let service: GravelmonDynamoDBService;
let env: ReturnType<typeof createTestEnv>;

beforeAll(async () => {
    env = createTestEnv("game-node")
    await env.createTable();
    service = env.service;
});

afterAll(async () => {
    env.destroy();
});

describe("DynamoNode", () => {
    it("should serialize and deserialize a DynamoNode correctly", async () => {
        // Arrange
        const node = new DynamoNode("TestEntity", "test-name", 2, 123456);
        const pk = node.PK;

        // Act
        await service.putItem(node);
        const readNode = await service.getNode(pk) as DynamoNode;

        // Assert
        expect(readNode).not.toBeNull();

        expect(readNode.PK).toBe(node.PK);
        expect(readNode.SK).toBe("METADATA");

        expect(readNode.entityType).toBe("TestEntity");
        expect(readNode.name).toBe("test-name");

        expect(readNode.version).toBe(2);
        expect(readNode.lastEdited).toBe(123456);
    });
});