import { ResourceLocation } from "../../../../gravelmon-dynamodb/models/minecraft/resourceLocation";
import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../../testEnv";
import { ItemNode } from "../../../../gravelmon-dynamodb/nodes/minecraft/itemNode";
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

describe("ItemNode", () => {
    test("should persist ItemNode optional fields correctly", async () => {
        const item = new ResourceLocation("minecraft", "diamond_sword");

        const node = new ItemNode(
            "item",
            item,
            true,
            "s3://textures/diamond.png",
            "sharpness_boost"
        );

        await service.putItem(node);
        const read = await service.getNode(node.PK) as ItemNode;

        expect(read.resourceLocation).toBeInstanceOf(ResourceLocation);
        expect(read.resourceLocation.toString()).toBe(item.toString());

        expect(read.isPlaceable).toBe(true);
        expect(read.s3TextureLocation).toBe("s3://textures/diamond.png");
        expect(read.inBattleEffect).toBe("sharpness_boost");
    });

    test("should handle missing optional ItemNode fields", async () => {
        const item = new ResourceLocation("minecraft", "stick");

        const node = new ItemNode("item", item, false);

        await service.putItem(node);
        const read = await service.getNode(node.PK) as ItemNode;

        expect(read.s3TextureLocation).toBeUndefined();
        expect(read.inBattleEffect).toBeUndefined();
    });
});

