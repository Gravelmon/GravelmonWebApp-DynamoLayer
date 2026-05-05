"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoNodes_1 = require("../../../../gravelmon-dynamodb/service/dynamoNodes");
const testEnv_1 = require("../../../testEnv");
const spawnPresetNode_1 = require("../../../../gravelmon-dynamodb/nodes/spawning/spawnPresetNode");
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const spawnCondition_1 = require("../../../../gravelmon-dynamodb/models/spawning/spawnCondition");
const numberRange_1 = require("../../../../gravelmon-dynamodb/models/properties/numberRange");
const time_1 = require("../../../../gravelmon-dynamodb/models/properties/time");
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
describe("SpawnPresetNode Integration Tests", () => {
    const testSpawnCondition = new spawnCondition_1.SpawnCondition({
        dimensions: ["minecraft:overworld", "minecraft:nether"],
        moonPhase: new numberRange_1.NumberRange(0, 4),
        canSeeSky: true,
        minY: 60,
        maxY: 120,
        minX: -1000,
        maxX: 1000,
        minZ: -1000,
        maxZ: 1000,
        minLight: 0,
        maxLight: 7,
        minSkyLight: 0,
        maxSkyLight: 10,
        timeRange: {
            type: "time", // night
            value: time_1.Time.Day
        },
        isRaining: false,
        isThundering: false,
        isSlimeChunk: false,
        labels: ["rare", "surface_spawn"],
        labelMode: spawnCondition_1.LabelMode.ALL,
        minWidth: 1,
        maxWidth: 3,
        minLength: 1,
        maxLength: 3,
        neededNearbyBlocks: [
            new resourceLocation_1.ResourceLocation("minecraft", "grass_block"),
            new resourceLocation_1.ResourceLocation("minecraft", "stone")
        ],
        neededBaseBlocks: [
            new resourceLocation_1.ResourceLocation("minecraft", "dirt")
        ],
        doesNotSpawnInBiomes: [
            new resourceLocation_1.ResourceLocation("minecraft", "desert"),
            new resourceLocation_1.ResourceLocation("minecraft", "ocean")
        ],
        spawnsInBiomes: [
            new resourceLocation_1.ResourceLocation("minecraft", "plains"),
            new resourceLocation_1.ResourceLocation("minecraft", "forest")
        ],
        doesNotSpawnInStructures: [
            new resourceLocation_1.ResourceLocation("minecraft", "village")
        ],
        spawnsInStructures: [
            new resourceLocation_1.ResourceLocation("minecraft", "ruined_portal")
        ],
        minDepth: 10,
        maxDepth: 64,
        fluidIsSource: false,
        fluid: new resourceLocation_1.ResourceLocation("minecraft", "water"),
        minLureLevel: 1,
        maxLureLevel: 3,
        bobber: new resourceLocation_1.ResourceLocation("minecraft", "fishing_bobber"),
        bait: new resourceLocation_1.ResourceLocation("minecraft", "worm")
    });
    test("should write and read a SpawnPresetNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const condition = testSpawnCondition;
        const antiCondition = testSpawnCondition;
        const spawnPresetData = {
            name: new resourceLocation_1.ResourceLocation("pokemon", "item/pokedex"),
            condition: condition,
            antiCondition: antiCondition
        };
        const spawnPresetNode = (0, spawnPresetNode_1.createSpawnPresetNode)(spawnPresetData);
        const pk = (0, dynamoNodes_1.getNodePK)(spawnPresetNode_1.SpawnPresetEntity, spawnPresetData.name.toString());
        // Act: Write the node to DynamoDB
        await service.putItem(spawnPresetNode);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(spawnPresetNode_1.SpawnPresetEntity);
        // Verify it's a SpawnPresetNode with proper data
        if (readNode && 'spawnPresetOptions' in readNode) {
            expect(readNode.spawnPresetOptions.name).toEqual(spawnPresetData.name);
            expect(readNode.spawnPresetOptions.condition).toEqual(spawnPresetData.condition);
            expect(readNode.spawnPresetOptions.antiCondition).toEqual(spawnPresetData.antiCondition);
        }
    });
});
