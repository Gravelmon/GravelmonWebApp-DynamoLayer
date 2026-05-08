import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import {createTestEnv} from "../../../testEnv";
import {
    SpeciesFeatureEntity,
    SpeciesFeatureType, ChoiceSpeciesFeatureNode,
    createChoiceSpeciesFeatureNode,
    createFlagSpeciesFeatureNode,
    FlagSpeciesFeatureNode
} from "../../../../gravelmon-dynamodb/nodes/properties/speciesFeatureNode";

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

describe("SpeciesFeatureNode - FlagSpeciesFeatureNode", () => {
    it("should serialize and deserialize a FlagSpeciesFeatureNode correctly", async () => {
        // Arrange
        const flagSpeciesFeatureNode = createFlagSpeciesFeatureNode(
            "shiny",
            "shiny",
            true,
            true,
            "pokemon_red",
            123456
        );
        const pk = flagSpeciesFeatureNode.PK;

        // Act
        await service.putItem(flagSpeciesFeatureNode);
        const readNode = await service.getNode(pk) as FlagSpeciesFeatureNode;

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(SpeciesFeatureEntity+SpeciesFeatureType.Flag);
        // Verify it's a SpawnPresetNode with proper data
        expect(readNode?.name).toBe("shiny");
        expect(readNode?.speciesFeatureType).toBe(SpeciesFeatureType.Flag);
        expect(readNode?.defaultOption).toBe(true);
        expect(readNode?.isPrimarySpeciesFeature).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_red");
        expect(readNode?.isSpeciesFeature).toBe(true);
    });
});

describe("SpeciesFeatureNode - ChoiceSpeciesFeatureNode", () => {
    it("should serialize and deserialize a ChoiceSpeciesFeatureNode correctly", async () => {
        // Arrange
        const choiceSpeciesFeatureNode = createChoiceSpeciesFeatureNode(
            "form",
            "form",
            ["kanto", "galar", "hisui"],
            "galar",
            true,
            "pokemon_sword",
            999999
        );
        const pk = choiceSpeciesFeatureNode.PK;

        // Act
        await service.putItem(choiceSpeciesFeatureNode);
        const readNode = await service.getNode(pk) as ChoiceSpeciesFeatureNode;

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(SpeciesFeatureEntity+SpeciesFeatureType.Choice);

        expect(readNode.name).toBe("form");
        expect(readNode?.speciesFeatureType).toBe(SpeciesFeatureType.Choice);
        expect(readNode?.defaultOption).toBe("galar");
        expect(readNode?.isPrimarySpeciesFeature).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_sword");

        expect(readNode?.choices).toEqual(["kanto", "galar", "hisui"]);
    });
});
