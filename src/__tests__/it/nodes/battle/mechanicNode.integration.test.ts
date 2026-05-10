import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createTestEnv } from "../../../testEnv";
import { PokemonIdentifier } from "../../../../gravelmon-dynamodb/nodes";
import { MechanicNode} from "../../../../gravelmon-dynamodb/nodes/battle/mechanicNode";
import { ResourceLocation } from "../../../../gravelmon-dynamodb/models/minecraft/resourceLocation";

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

describe("MechanicNode Integration Tests", () => {
    const form1 = new PokemonIdentifier("pokemon", "charizard");
    const form2 = new PokemonIdentifier("pokemon", "mewtwo");
    const item1 = new ResourceLocation("minecraft", "mega_stone");
    const item2 = new ResourceLocation("minecraft", "key_stone");
    test("should persist description correctly", async () => {
        const node = new MechanicNode("mega_evolution", "Transforms Pokémon during battle");

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MechanicNode;

        expect(read.description).toBe("Transforms Pokémon during battle");
    });

    test("should persist usesItems correctly", async () => {

        const node = new MechanicNode("mega_evolution", "description", [item1, item2]);

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MechanicNode;

        expect(read.usesItems).toHaveLength(2);
        expect(read.usesItems?.[0].toString()).toBe(item1.toString());
        expect(read.usesItems?.[1].toString()).toBe(item2.toString());
    });

    test("should persist affectsForms correctly", async () => {

        const node = new MechanicNode("mega_evolution", "description", [item1, item2], [form1, form2]);

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MechanicNode;

        expect(read.affectsForms).toHaveLength(2);
        expect(read.affectsForms?.[0].toString()).toBe(form1.toString());
        expect(read.affectsForms?.[1].toString()).toBe(form2.toString());
    });

    test("should handle undefined optional fields", async () => {
        const node = new MechanicNode("mega_evolution");

        await service.putItem(node);
        const read = await service.getNode(node.PK) as MechanicNode;

        expect(read.description).toBeUndefined();
        expect(read.usesItems).toBeUndefined();
        expect(read.affectsForms).toBeUndefined();
    });
});

