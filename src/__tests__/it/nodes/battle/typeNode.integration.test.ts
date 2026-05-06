
import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../../testEnv";
import { createTypeNode, TypeNode } from "../../../../gravelmon-dynamodb/nodes";

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

describe("AbilityNode", () => {
    test("TypeNode should persist resists, immunities, weaknesses and introducedByGames", async () => {
        const node = createTypeNode(
            "fire",
            ["grass", "ice", "bug"],
            ["burn"],
            ["water", "ground", "rock"],
            ["pokemon_red", "pokemon_gold"]
        );

        await service.putItem(node);
        const read = await service.getNode(node.PK) as TypeNode;

        expect(read).toBeInstanceOf(TypeNode);

        expect((read as any).resists).toEqual(["grass", "ice", "bug"]);
        expect((read as any).immunities).toEqual(["burn"]);
        expect((read as any).weaknesses).toEqual(["water", "ground", "rock"]);
        expect((read as any).introducedByGames).toEqual(["pokemon_red", "pokemon_gold"]);
    });

    test("TypeNode should handle undefined optional arrays", async () => {
        const node = createTypeNode("electric");

        await service.putItem(node);
        const read = await service.getNode(node.PK) as TypeNode;

        expect(read).toBeInstanceOf(TypeNode);

        expect((read as any).resists).toBeUndefined();
        expect((read as any).immunities).toBeUndefined();
        expect((read as any).weaknesses).toBeUndefined();
        expect((read as any).introducedByGames).toBeUndefined();
    });

    test("TypeNode should persist only provided arrays", async () => {
        const node = createTypeNode(
            "water",
            ["fire"],
            undefined,
            undefined,
            ["pokemon_sapphire"]
        );

        await service.putItem(node);
        const read = await service.getNode(node.PK) as TypeNode;

        expect((read as any).resists).toEqual(["fire"]);
        expect((read as any).immunities).toBeUndefined();
        expect((read as any).weaknesses).toBeUndefined();
        expect((read as any).introducedByGames).toEqual(["pokemon_sapphire"]);
    });
});

