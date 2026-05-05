"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const animationNode_1 = require("../../../../gravelmon-dynamodb/nodes/assets/animationNode");
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
describe("AnimationNode Integration Tests", () => {
    test("should persist primaryPoseType correctly (BattleAnimation)", async () => {
        const node = (0, animationNode_1.createAnimationNode)("idle", "BattleAnimation");
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk, node.SK);
        expect(read).not.toBeNull();
        expect(read.entityType).toBe(animationNode_1.AnimationEntity);
        expect(read.primaryPoseType).toBe("BattleAnimation");
        // ensure SK round-trip integrity
        expect(read.SK).toBe("Animation#idle");
    });
    test("should persist default primaryPoseType (Other)", async () => {
        const node = (0, animationNode_1.createAnimationNode)("run"); // default = "Other"
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk, node.SK);
        expect(read).not.toBeNull();
        expect(read.entityType).toBe(animationNode_1.AnimationEntity);
        expect(read.primaryPoseType).toBe("Other");
        expect(read.SK).toBe("Animation#run");
    });
    test("should deserialize SK back into correct animation name", async () => {
        const node = (0, animationNode_1.createAnimationNode)("attack", "Other");
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk, node.SK);
        expect(read.SK).toBe("Animation#attack");
        // derived correctness from SK parsing logic
        expect(read.SK.split("#")[1]).toBe("attack");
    });
});
