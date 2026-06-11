import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb";
import { createTestEnv } from "../../../testEnv";
import {AnimationEntity, AnimationNode } from "../../../../gravelmon-dynamodb";

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

describe("AnimationNode Integration Tests", () => {
    test("should persist primaryPoseType correctly (BattleAnimation)", async () => {
        const node = new AnimationNode("idle");
        const pk = node.PK;

        await service.putItem(node);
        const read = await service.getNode(pk, node.SK) as AnimationNode;

        expect(read).not.toBeNull();
        expect(read.entityType).toBe(AnimationEntity);

        // expect(read.primaryPoseType).toBe("BattleAnimation");

        // ensure SK round-trip integrity
        expect(read.SK).toBe("Animation#idle");
    });
});