import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb";
import {createTestEnv} from "../../../testEnv";
import {createTypeNode, TypeNode} from "../../../../gravelmon-dynamodb";

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
            {
                resists: ["grass", "ice", "bug"],
                immunities: ["fire"],
                weaknesses: ["water", "ground", "rock"]
            },
            undefined,
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
});

