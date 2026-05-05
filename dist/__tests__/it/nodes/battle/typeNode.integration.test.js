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
    test("TypeNode should persist resists, immunities, weaknesses and introducedByGames", async () => {
        const node = (0, nodes_1.createTypeNode)("fire", ["grass", "ice", "bug"], ["burn"], ["water", "ground", "rock"], ["pokemon_red", "pokemon_gold"]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read).toBeInstanceOf(nodes_1.TypeNode);
        expect(read.resists).toEqual(["grass", "ice", "bug"]);
        expect(read.immunities).toEqual(["burn"]);
        expect(read.weaknesses).toEqual(["water", "ground", "rock"]);
        expect(read.introducedByGames).toEqual(["pokemon_red", "pokemon_gold"]);
    });
    test("TypeNode should handle undefined optional arrays", async () => {
        const node = (0, nodes_1.createTypeNode)("electric");
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read).toBeInstanceOf(nodes_1.TypeNode);
        expect(read.resists).toBeUndefined();
        expect(read.immunities).toBeUndefined();
        expect(read.weaknesses).toBeUndefined();
        expect(read.introducedByGames).toBeUndefined();
    });
    test("TypeNode should persist only provided arrays", async () => {
        const node = (0, nodes_1.createTypeNode)("water", ["fire"], undefined, undefined, ["pokemon_sapphire"]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resists).toEqual(["fire"]);
        expect(read.immunities).toBeUndefined();
        expect(read.weaknesses).toBeUndefined();
        expect(read.introducedByGames).toEqual(["pokemon_sapphire"]);
    });
});
