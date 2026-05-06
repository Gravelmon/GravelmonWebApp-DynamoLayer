import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../../testEnv";
import {AnimationEntity, AnimationNode, createAnimationNode } from "../../../../gravelmon-dynamodb/nodes/assets/animationNode";

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
        const node = createAnimationNode("idle", "BattleAnimation");
        const pk = node.PK;

        await service.putItem(node);
        const read = await service.getNode(pk, node.SK) as AnimationNode;

        expect(read).not.toBeNull();
        expect(read.entityType).toBe(AnimationEntity);

        expect(read.primaryPoseType).toBe("BattleAnimation");

        // ensure SK round-trip integrity
        expect(read.SK).toBe("Animation#idle");
    });

    test("should persist default primaryPoseType (Other)", async () => {
        const node = createAnimationNode("run"); // default = "Other"
        const pk = node.PK;

        await service.putItem(node);
        const read = await service.getNode(pk, node.SK) as AnimationNode;

        expect(read).not.toBeNull();
        expect(read.entityType).toBe(AnimationEntity);

        expect(read.primaryPoseType).toBe("Other");
        expect(read.SK).toBe("Animation#run");
    });

    test("should deserialize SK back into correct animation name", async () => {
        const node = createAnimationNode("attack", "Other");
        const pk = node.PK;

        await service.putItem(node);
        const read = await service.getNode(pk, node.SK) as AnimationNode;

        expect(read.SK).toBe("Animation#attack");

        // derived correctness from SK parsing logic
        expect(read.SK.split("#")[1]).toBe("attack");
    });
});