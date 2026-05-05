"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const testEnv_1 = require("../../../testEnv");
const itemNode_1 = require("../../../../gravelmon-dynamodb/nodes/minecraft/itemNode");
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
describe("ItemNode", () => {
    test("should persist ItemNode optional fields correctly", async () => {
        const item = new resourceLocation_1.ResourceLocation("minecraft", "diamond_sword");
        const node = new itemNode_1.ItemNode("item", item, true, "s3://textures/diamond.png", "sharpness_boost");
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.resourceLocation).toBeInstanceOf(resourceLocation_1.ResourceLocation);
        expect(read.resourceLocation.toString()).toBe(item.toString());
        expect(read.isPlaceable).toBe(true);
        expect(read.s3TextureLocation).toBe("s3://textures/diamond.png");
        expect(read.inBattleEffect).toBe("sharpness_boost");
    });
    test("should handle missing optional ItemNode fields", async () => {
        const item = new resourceLocation_1.ResourceLocation("minecraft", "stick");
        const node = new itemNode_1.ItemNode("item", item, false);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.s3TextureLocation).toBeUndefined();
        expect(read.inBattleEffect).toBeUndefined();
    });
});
