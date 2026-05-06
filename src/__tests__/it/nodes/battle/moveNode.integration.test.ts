import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../../testEnv";
import { MoveCategory, MoveIdentifier, MoveNode } from "../../../../gravelmon-dynamodb/nodes";
import {MoveRange} from "../../../../gravelmon-dynamodb/models/battle/moveRange";

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

describe("MoveNode", () => {
    test("MoveNode should persist moveIdentifier, moveLabels and rebalancedMoveData", async () => {
        const moveId = new MoveIdentifier("pokemon_scarlet", "flamethrower");

        const moveData = {
            moveTypes: [{ type: "fire", isRebalanced: false }],
            powerPoints: 15,
            basePower: 90,
            priority: 0,
            accuracy: 100,
            moveRange: MoveRange.AllAllies,
            moveCategory: MoveCategory.Special,
            description: "Burns the target",
            typeGemCost: { fire: 1 }
        };

        const rebalanced = {
            ...moveData,
            basePower: 85
        };

        const node = new MoveNode(
            moveId,
            moveData,
            rebalanced,
            ["tm", "special"]
        );

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MoveNode;

        expect(read).not.toBeNull();

        // identifier
        expect(read.moveIdentifier).toBeInstanceOf(MoveIdentifier);
        expect(read.moveIdentifier.toString()).toBe("pokemon_scarlet#flamethrower");

        // labels
        expect(read.moveLabels).toEqual(["tm", "special"]);

        // rebalanced data exists
        expect(read.rebalancedMoveData).toBeDefined();
        expect(read.rebalancedMoveData?.basePower).toBe(85);
    });

    test("MoveNode should correctly serialize moveData structure", async () => {
        const moveId = new MoveIdentifier("test_game", "ice_beam");

        const moveData = {
            moveTypes: [
                { type: "ice", isRebalanced: true },
                { type: "water", isRebalanced: false }
            ],
            powerPoints: 10,
            basePower: 90,
            priority: 0,
            accuracy: 100,
            moveRange: MoveRange.AllAllies,
            moveCategory: MoveCategory.Special,
            description: "Freezes target",
            typeGemCost: { ice: 2 }
        };

        const node = new MoveNode(moveId, moveData, undefined, ["hm"]);

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MoveNode;

        expect(read.moveData.moveTypes).toHaveLength(2);
        expect(read.moveData.moveTypes[0]).toEqual({
            type: "ice",
            isRebalanced: true
        });

        expect(read.moveData.powerPoints).toBe(10);
        expect(read.moveData.typeGemCost).toEqual({ ice: 2 });
    });

    test("MoveNode should default moveLabels to empty array", () => {
        const moveId = new MoveIdentifier("game", "tackle");

        const node = new MoveNode(moveId, {
            moveTypes: [],
            powerPoints: 35,
            basePower: 40,
            priority: 0,
            accuracy: 100,
            moveRange: MoveRange.AllAllies,
            moveCategory: MoveCategory.Physical,
            description: "",
            typeGemCost: {}
        });

        expect(node.moveLabels).toEqual([]);
    });
});

