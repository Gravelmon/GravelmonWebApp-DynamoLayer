"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const structureNode_1 = require("../../../../gravelmon-dynamodb/nodes/minecraft/structureNode");
const testEnv_1 = require("../../../testEnv");
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
describe("StructureNode", () => {
    test("should persist resourceLocation and identifier correctly", async () => {
        const structure = new resourceLocation_1.ResourceLocation("minecraft", "plains");
        const node = new structureNode_1.StructureNode(structure);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resourceLocation.toString()).toBe(structure.toString());
        expect(read.resourceLocation).toBeInstanceOf(resourceLocation_1.ResourceLocation);
    });
});
describe("StructureTagNode", () => {
    test("should persist containsStructures correctly", async () => {
        const tag = new resourceLocation_1.ResourceLocation("minecraft", "is_forest");
        const structure1 = new resourceLocation_1.ResourceLocation("minecraft", "dark_forest");
        const structure2 = new resourceLocation_1.ResourceLocation("minecraft", "birch_forest");
        const node = new structureNode_1.StructureTagNode(tag, [structure1, structure2]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resourceLocation.toString()).toBe(tag.toString());
        expect(read.containsStructures.length).toBe(2);
        expect(read.containsStructures[0].toString()).toBe(structure1.toString());
        expect(read.containsStructures[1].toString()).toBe(structure2.toString());
        expect(read.containsStructures[0]).toBeInstanceOf(resourceLocation_1.ResourceLocation);
    });
    test("should handle empty containsStructures", async () => {
        const tag = new resourceLocation_1.ResourceLocation("minecraft", "empty");
        const node = new structureNode_1.StructureTagNode(tag, []);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.containsStructures).toEqual([]);
    });
});
