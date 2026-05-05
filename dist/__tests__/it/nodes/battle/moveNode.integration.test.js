"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const nodes_1 = require("../../../../gravelmon-dynamodb/nodes");
const moveRange_1 = require("../../../../gravelmon-dynamodb/models/battle/moveRange");
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
describe("MoveNode", () => {
    test("MoveNode should persist moveIdentifier, moveLabels and rebalancedMoveData", async () => {
        const moveId = new nodes_1.MoveIdentifier("pokemon_scarlet", "flamethrower");
        const moveData = {
            moveTypes: [{ type: "fire", isRebalanced: false }],
            powerPoints: 15,
            basePower: 90,
            priority: 0,
            accuracy: 100,
            moveRange: moveRange_1.MoveRange.AllAllies,
            moveCategory: nodes_1.MoveCategory.Special,
            description: "Burns the target",
            typeGemCost: { fire: 1 }
        };
        const rebalanced = {
            ...moveData,
            basePower: 85
        };
        const node = new nodes_1.MoveNode(moveId, moveData, rebalanced, ["tm", "special"]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read).not.toBeNull();
        // identifier
        expect(read.moveIdentifier).toBeInstanceOf(nodes_1.MoveIdentifier);
        expect(read.moveIdentifier.toString()).toBe("pokemon_scarlet#flamethrower");
        // labels
        expect(read.moveLabels).toEqual(["tm", "special"]);
        // rebalanced data exists
        expect(read.rebalancedMoveData).toBeDefined();
        expect(read.rebalancedMoveData?.basePower).toBe(85);
    });
    test("MoveNode should correctly serialize moveData structure", async () => {
        const moveId = new nodes_1.MoveIdentifier("test_game", "ice_beam");
        const moveData = {
            moveTypes: [
                { type: "ice", isRebalanced: true },
                { type: "water", isRebalanced: false }
            ],
            powerPoints: 10,
            basePower: 90,
            priority: 0,
            accuracy: 100,
            moveRange: moveRange_1.MoveRange.AllAllies,
            moveCategory: nodes_1.MoveCategory.Special,
            description: "Freezes target",
            typeGemCost: { ice: 2 }
        };
        const node = new nodes_1.MoveNode(moveId, moveData, undefined, ["hm"]);
        await service.putItem(node);
        const read = await service.getNode(node.PK);
        expect(read.moveData.moveTypes).toHaveLength(2);
        expect(read.moveData.moveTypes[0]).toEqual({
            type: "ice",
            isRebalanced: true
        });
        expect(read.moveData.powerPoints).toBe(10);
        expect(read.moveData.typeGemCost).toEqual({ ice: 2 });
    });
    test("MoveNode should default moveLabels to empty array", () => {
        const moveId = new nodes_1.MoveIdentifier("game", "tackle");
        const node = new nodes_1.MoveNode(moveId, {
            moveTypes: [],
            powerPoints: 35,
            basePower: 40,
            priority: 0,
            accuracy: 100,
            moveRange: moveRange_1.MoveRange.AllAllies,
            moveCategory: nodes_1.MoveCategory.Physical,
            description: "",
            typeGemCost: {}
        });
        expect(node.moveLabels).toEqual([]);
    });
});
