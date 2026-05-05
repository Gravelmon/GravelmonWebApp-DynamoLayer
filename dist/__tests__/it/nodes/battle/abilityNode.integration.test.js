"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const nodes_1 = require("../../../../gravelmon-dynamodb/nodes");
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
describe("AbilityNode", () => {
    test("AbilityNode should serialize and deserialize identifier and description", async () => {
        const identifier = new nodes_1.AbilityIdentifier("pokemon_sword", "pressure");
        const node = new nodes_1.AbilityNode(identifier, "Reduces opponent PP usage");
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read).not.toBeNull();
        expect(read.identifier).toBeInstanceOf(nodes_1.AbilityIdentifier);
        expect(read.identifier.game).toBe("pokemon_sword");
        expect(read.identifier.ability).toBe("pressure");
        expect(read.identifier.toString()).toBe("pokemon_sword#pressure");
        expect(read.description).toBe("Reduces opponent PP usage");
    });
    test("AbilityNode should handle missing description", async () => {
        const identifier = new nodes_1.AbilityIdentifier("pokemon_scarlet", "overgrow");
        const node = new nodes_1.AbilityNode(identifier);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.identifier).toBeInstanceOf(nodes_1.AbilityIdentifier);
        expect(read.description).toBeUndefined();
    });
    test("AbilityIdentifier.fromString should round-trip correctly", () => {
        const id = nodes_1.AbilityIdentifier.fromString("pokemon_sword#intimidate");
        expect(id.game).toBe("pokemon_sword");
        expect(id.ability).toBe("intimidate");
        expect(id.toString()).toBe("pokemon_sword#intimidate");
    });
});
