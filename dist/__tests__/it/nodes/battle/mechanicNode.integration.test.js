"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const nodes_1 = require("../../../../gravelmon-dynamodb/nodes");
const mechanicNode_1 = require("../../../../gravelmon-dynamodb/nodes/battle/mechanicNode");
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
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
describe("MechanicNode Integration Tests", () => {
    const form1 = new nodes_1.PokemonIdentifier("pokemon", "charizard");
    const form2 = new nodes_1.PokemonIdentifier("pokemon", "mewtwo");
    const item1 = new resourceLocation_1.ResourceLocation("minecraft", "mega_stone");
    const item2 = new resourceLocation_1.ResourceLocation("minecraft", "key_stone");
    test("should persist description correctly", async () => {
        const node = (0, mechanicNode_1.createMechanicNode)("mega_evolution", "Transforms Pokémon during battle");
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.description).toBe("Transforms Pokémon during battle");
    });
    test("should persist usesItems correctly", async () => {
        const node = (0, mechanicNode_1.createMechanicNode)("mega_evolution", "description", [item1, item2]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.usesItems).toHaveLength(2);
        expect(read.usesItems?.[0].toString()).toBe(item1.toString());
        expect(read.usesItems?.[1].toString()).toBe(item2.toString());
    });
    test("should persist affectsForms correctly", async () => {
        const node = (0, mechanicNode_1.createMechanicNode)("mega_evolution", "description", [item1, item2], [form1, form2]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.affectsForms).toHaveLength(2);
        expect(read.affectsForms?.[0].toString()).toBe(form1.toString());
        expect(read.affectsForms?.[1].toString()).toBe(form2.toString());
    });
    test("should handle undefined optional fields", async () => {
        const node = (0, mechanicNode_1.createMechanicNode)("mega_evolution");
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.description).toBeUndefined();
        expect(read.usesItems).toBeUndefined();
        expect(read.affectsForms).toBeUndefined();
    });
});
