import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import {createTestEnv} from "../../../testEnv";
import {
    AspectEntity,
    AspectType, ChoiceAspectNode,
    createChoiceAspectNode,
    createFlagAspectNode,
    FlagAspectNode
} from "../../../../gravelmon-dynamodb/nodes/properties/aspectNode";

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

describe("AspectNode - FlagAspectNode", () => {
    it("should serialize and deserialize a FlagAspectNode correctly", async () => {
        // Arrange
        const flagAspectNode = createFlagAspectNode(
            "shiny",
            "shiny",
            true,
            true,
            "pokemon_red",
            123456
        );
        const pk = flagAspectNode.PK;

        // Act
        await service.putItem(flagAspectNode);
        const readNode = await service.getNode(pk) as FlagAspectNode;

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(AspectEntity+AspectType.Flag);
        // Verify it's a SpawnPresetNode with proper data
        expect(readNode?.name).toBe("shiny");
        expect(readNode?.aspectType).toBe(AspectType.Flag);
        expect(readNode?.defaultOption).toBe(true);
        expect(readNode?.isPrimaryAspect).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_red");
        expect(readNode?.isAspect).toBe(true);
    });
});

describe("AspectNode - ChoiceAspectNode", () => {
    it("should serialize and deserialize a ChoiceAspectNode correctly", async () => {
        // Arrange
        const choiceAspectNode = createChoiceAspectNode(
            "form",
            "form",
            ["kanto", "galar", "hisui"],
            "galar",
            true,
            "pokemon_sword",
            999999
        );
        const pk = choiceAspectNode.PK;

        // Act
        await service.putItem(choiceAspectNode);
        const readNode = await service.getNode(pk) as ChoiceAspectNode;

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(AspectEntity+AspectType.Choice);

        expect(readNode.name).toBe("form");
        expect(readNode?.aspectType).toBe(AspectType.Choice);
        expect(readNode?.defaultOption).toBe("galar");
        expect(readNode?.isPrimaryAspect).toBe(true);
        expect(readNode?.introducedByGame).toBe("pokemon_sword");

        expect(readNode?.choices).toEqual(["kanto", "galar", "hisui"]);
    });
});
