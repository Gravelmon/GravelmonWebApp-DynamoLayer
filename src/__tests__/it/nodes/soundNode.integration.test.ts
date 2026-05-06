import { GravelmonDynamoDBService } from "../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { getNodePK } from "../../../gravelmon-dynamodb/service/dynamoNodes";
import {createTestEnv} from "../../testEnv";
import {SoundData} from "../../../gravelmon-dynamodb/models/soundData";
import {createSoundNode, SoundEntity} from "../../../gravelmon-dynamodb/nodes/soundNode";
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

describe("SoundNode Integration Tests", () => {
    test("should write and read a SoundNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const soundData : SoundData = {
            name: "Pokemon Red",
            s3Location: "https://s3.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
            madeBy: "pokemon-logos/red.png",
        };

        const soundNode = createSoundNode(soundData);
        const pk = getNodePK(SoundEntity, soundData.name);

        // Act: Write the node to DynamoDB
        await service.putItem(soundNode);
        const readNode = await service.getNode(pk);

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.name).toBe(soundData.name);
        expect(readNode?.entityType).toBe(SoundEntity);

        // Verify it's a SoundNode with proper data
        if (readNode && 'soundData' in readNode) {
            expect((readNode as any).soundData.name).toBe(soundData.name);
            expect((readNode as any).soundData.s3Location).toBe(soundData.s3Location);
            expect((readNode as any).soundData.madeBy).toBe(soundData.madeBy);
        }
    });
});
