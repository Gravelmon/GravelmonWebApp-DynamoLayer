"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoNodes_1 = require("../../../gravelmon-dynamodb/service/dynamoNodes");
const testEnv_1 = require("../../testEnv");
const soundNode_1 = require("../../../gravelmon-dynamodb/nodes/soundNode");
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
describe("SoundNode Integration Tests", () => {
    test("should write and read a SoundNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const soundData = {
            name: "Pokemon Red",
            s3Location: "https://s3.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
            madeBy: "pokemon-logos/red.png",
        };
        const soundNode = (0, soundNode_1.createSoundNode)(soundData);
        const pk = (0, dynamoNodes_1.getNodePK)(soundNode_1.SoundEntity, soundData.name);
        // Act: Write the node to DynamoDB
        await service.putItem(soundNode);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.name).toBe(soundData.name);
        expect(readNode?.entityType).toBe(soundNode_1.SoundEntity);
        // Verify it's a SoundNode with proper data
        if (readNode && 'soundData' in readNode) {
            expect(readNode.soundData.name).toBe(soundData.name);
            expect(readNode.soundData.s3Location).toBe(soundData.s3Location);
            expect(readNode.soundData.madeBy).toBe(soundData.madeBy);
        }
    });
});
