"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const aspectNode_1 = require("../../../../gravelmon-dynamodb/nodes/properties/aspectNode");
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
describe("AspectNode - FlagAspectNode", () => {
    it("should serialize and deserialize a FlagAspectNode correctly", async () => {
        // Arrange
        const flagAspectNode = (0, aspectNode_1.createFlagAspectNode)("shiny", true, true, "pokemon_red", 123456);
        const pk = flagAspectNode.PK;
        // Act
        await service.putItem(flagAspectNode);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(aspectNode_1.AspectEntity + aspectNode_1.AspectType.Flag);
        // Verify it's a SpawnPresetNode with proper data
        expect(readNode?.name).toBe("shiny");
        expect(readNode?.aspectType).toBe(aspectNode_1.AspectType.Flag);
        expect(readNode?.defaultOption).toBe(true);
        expect(readNode?.isPrimaryAspect).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_red");
        expect(readNode?.isAspect).toBe(true);
    });
});
describe("AspectNode - ChoiceAspectNode", () => {
    it("should serialize and deserialize a ChoiceAspectNode correctly", async () => {
        // Arrange
        const choiceAspectNode = (0, aspectNode_1.createChoiceAspectNode)("form", ["kanto", "galar", "hisui"], "galar", true, "pokemon_sword", 999999);
        const pk = choiceAspectNode.PK;
        // Act
        await service.putItem(choiceAspectNode);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(aspectNode_1.AspectEntity + aspectNode_1.AspectType.Choice);
        expect(readNode.name).toBe("form");
        expect(readNode?.aspectType).toBe(aspectNode_1.AspectType.Choice);
        expect(readNode?.defaultOption).toBe("galar");
        expect(readNode?.isPrimaryAspect).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_sword");
        expect(readNode?.choices).toEqual(["kanto", "galar", "hisui"]);
    });
});
