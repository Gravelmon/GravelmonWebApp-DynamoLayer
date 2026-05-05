"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const biomeNode_1 = require("../../../../gravelmon-dynamodb/nodes/minecraft/biomeNode");
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
describe("BiomeNode", () => {
    test("should persist resourceLocation and identifier correctly", async () => {
        const biome = new resourceLocation_1.ResourceLocation("minecraft", "plains");
        const node = new biomeNode_1.BiomeNode(biome);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resourceLocation.toString()).toBe(biome.toString());
        expect(read.resourceLocation).toBeInstanceOf(resourceLocation_1.ResourceLocation);
    });
});
describe("BiomeTagNode", () => {
    test("should persist containsBiomes correctly", async () => {
        const tag = new resourceLocation_1.ResourceLocation("minecraft", "is_forest");
        const biome1 = new resourceLocation_1.ResourceLocation("minecraft", "dark_forest");
        const biome2 = new resourceLocation_1.ResourceLocation("minecraft", "birch_forest");
        const node = new biomeNode_1.BiomeTagNode(tag, [biome1, biome2]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resourceLocation.toString()).toBe(tag.toString());
        expect(read.containsBiomes.length).toBe(2);
        expect(read.containsBiomes[0].toString()).toBe(biome1.toString());
        expect(read.containsBiomes[1].toString()).toBe(biome2.toString());
        expect(read.containsBiomes[0]).toBeInstanceOf(resourceLocation_1.ResourceLocation);
    });
    test("should handle empty containsBiomes", async () => {
        const tag = new resourceLocation_1.ResourceLocation("minecraft", "empty");
        const node = new biomeNode_1.BiomeTagNode(tag, []);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.containsBiomes).toEqual([]);
    });
});
