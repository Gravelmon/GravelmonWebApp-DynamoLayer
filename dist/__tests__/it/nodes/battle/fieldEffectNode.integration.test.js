"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const fieldEffectNode_1 = require("../../../../gravelmon-dynamodb/nodes/battle/fieldEffectNode");
const moveRange_1 = require("../../../../gravelmon-dynamodb/models/battle/moveRange");
let service;
let env;
beforeAll(async () => {
    env = (0, testEnv_1.createTestEnv)(`field-effect-${Date.now()}-${Math.random()}`);
    await env.createTable();
    service = env.service;
});
afterAll(async () => {
    await env.destroy();
});
describe("FieldEffectNode Integration Tests", () => {
    test("should serialize and deserialize FieldEffectNode correctly", async () => {
        const identifier = new fieldEffectNode_1.FieldEffectIdentifier("pokemon", "trick_room");
        const node = new fieldEffectNode_1.FieldEffectNode({
            identifier,
            durationInTurns: 5,
            fieldEffectRange: moveRange_1.MoveRange.AllPokemon,
            description: "Reverses turn order"
        }, undefined, ["speed", "priority"]);
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk);
        expect(read).not.toBeNull();
        expect(read.entityType).toBe(fieldEffectNode_1.FieldEffectEntity);
        // identifier
        expect(read.fieldEffectData.identifier.toString()).toBe(identifier.toString());
        // core fields
        expect(read.fieldEffectData.durationInTurns).toBe(5);
        expect(read.fieldEffectData.fieldEffectRange).toBe(moveRange_1.MoveRange.AllPokemon);
        expect(read.fieldEffectData.description).toBe("Reverses turn order");
        // labels
        expect(read.fieldEffectLabels).toEqual(["speed", "priority"]);
    });
    test("should handle rebalancedFieldEffectData correctly", async () => {
        const identifier = new fieldEffectNode_1.FieldEffectIdentifier("pokemon", "gravity");
        const baseData = {
            identifier,
            durationInTurns: 5,
            fieldEffectRange: moveRange_1.MoveRange.AllPokemon,
            description: "Grounds all Pokémon"
        };
        const rebalancedData = {
            identifier,
            durationInTurns: 3,
            fieldEffectRange: moveRange_1.MoveRange.AllPokemon,
            description: "Shortened duration"
        };
        const node = new fieldEffectNode_1.FieldEffectNode(baseData, rebalancedData, ["field"]);
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk);
        expect(read.rebalancedFieldEffectData).toBeDefined();
        expect(read.rebalancedFieldEffectData.durationInTurns).toBe(3);
        expect(read.rebalancedFieldEffectData.description).toBe("Shortened duration");
    });
    test("should default fieldEffectLabels to empty array", async () => {
        const identifier = new fieldEffectNode_1.FieldEffectIdentifier("pokemon", "rain");
        const node = new fieldEffectNode_1.FieldEffectNode({
            identifier,
            durationInTurns: 5,
            fieldEffectRange: moveRange_1.MoveRange.AllAllies
        });
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk);
        expect(read.fieldEffectLabels).toEqual([]);
    });
    test("should correctly persist nested identifier structure", async () => {
        const identifier = new fieldEffectNode_1.FieldEffectIdentifier("pokemon_scarlet", "sun");
        const node = new fieldEffectNode_1.FieldEffectNode({
            identifier,
            durationInTurns: 5,
            fieldEffectRange: moveRange_1.MoveRange.AllOpponents
        });
        const pk = node.PK;
        await service.putItem(node);
        const read = await service.getNode(pk);
        expect(read.fieldEffectData.identifier.game).toBe("pokemon_scarlet");
        expect(read.fieldEffectData.identifier.getFieldEffect()).toBe("sun");
    });
});
