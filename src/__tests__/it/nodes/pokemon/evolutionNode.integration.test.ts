import {
    GravelmonDynamoDBService,
    PartyMemberCondition,
    PropertyCondition,
    Stat,
    Time
} from "../../../../gravelmon-dynamodb";
import {createTestEnv} from "../../../testEnv";
import {getNodePK} from "../../../../gravelmon-dynamodb";

import {PokemonIdentifier} from "../../../../gravelmon-dynamodb";
import {ResourceLocation} from "../../../../gravelmon-dynamodb";
import {
    EvolutionEntity,
    EvolutionNode,
    EvolutionType
} from "../../../../gravelmon-dynamodb";
import {
    LevelCondition,
    StatCompareCondition,
    HasMoveCondition,
    HeldItemCondition,
    FriendshipCondition,
    BiomeCondition,
    RainingCondition,
    ThunderCondition,
    BlocksTraveledCondition,
    Gender
} from "../../../../gravelmon-dynamodb";

import {MoveIdentifier} from "../../../../gravelmon-dynamodb";
import {TimeCondition} from "../../../../gravelmon-dynamodb";

let service: GravelmonDynamoDBService;
let env: ReturnType<typeof createTestEnv>;

beforeAll(async () => {
    env = createTestEnv("game-node");
    await env.createTable();
    service = env.service;
});

afterAll(async () => {
    env.destroy();
});

describe("EvolutionNode Integration Tests", () => {

    const testEvolutionConditions = [
        // LEVEL
        new LevelCondition(36),

        // TIME
        new TimeCondition(Time.Night),

        // RATIO
        new StatCompareCondition(Stat.attack, Stat.defence),

        // HAS_MOVE
        new HasMoveCondition(
            new MoveIdentifier("pokemon_red", "tackle")
        ),

        // HELD_ITEM
        new HeldItemCondition(
            new ResourceLocation("minecraft", "water_stone")
        ),

        // GENDER
        new PropertyCondition(`gender=${Gender.MALE}`),

        // FRIENDSHIP
        new FriendshipCondition(220),

        // PARTY_MEMBER (pokemon)
        new PartyMemberCondition("pikachu"),

        // PARTY_MEMBER_OF_TYPE
        new PartyMemberCondition("type=fire"),

        // BIOME
        new BiomeCondition(
            new ResourceLocation("minecraft", "plains")
        ),

        // WEATHER - rain
        new RainingCondition(true),

        // WEATHER - thunder
        new ThunderCondition(true),

        // BLOCKS_TRAVELED
        new BlocksTraveledCondition(5000)
    ];
    it("should serialize and deserialize an EvolutionNode correctly", async () => {

        // -------------------------
        // Arrange
        // -------------------------
        const result = new PokemonIdentifier("pokemon", "raichu");

        const evolutionNode = new EvolutionNode(result, {
            evolutionType: EvolutionType.ItemInteract,
            consumesHeldItem: true,
            isOptional: false,

            evolutionConditions: testEvolutionConditions,

            needsToHoldItem: new ResourceLocation("minecraft", "thunder_stone"),
            requiresItemUsedOn: new ResourceLocation("minecraft", "player"),

            learnsMovesUponEvolving: [new MoveIdentifier("pokemon_red", "tackle")],
        },
        [], []
        );

        const pk = getNodePK(EvolutionEntity, result.toString());

        // -------------------------
        // Act
        // -------------------------
        await service.putItem(evolutionNode);
        const readNode = await service.getNode(pk) as EvolutionNode;

        // -------------------------
        // Assert (node-level)
        // -------------------------
        expect(readNode).not.toBeNull();
        expect(readNode.entityType).toBe(EvolutionEntity);

        // -------------------------
        // Assert identifier
        // -------------------------
        expect(readNode.evolutionOptions.evolutionType)
            .toBe(EvolutionType.ItemInteract);

        expect(readNode.evolutionOptions.consumesHeldItem)
            .toBe(true);

        expect(readNode.evolutionOptions.isOptional)
            .toBe(false);

        // -------------------------
        // Assert item interactions
        // -------------------------
        expect(readNode.evolutionOptions.needsToHoldItem?.toString())
            .toBe("minecraft:thunder_stone");

        expect(readNode.evolutionOptions.requiresItemUsedOn?.toString())
            .toBe("minecraft:player");
        // -------------------------
        // Assert move learning
        // -------------------------
        expect(readNode.evolutionOptions.learnsMovesUponEvolving)
            .toEqual([new MoveIdentifier("pokemon_red", "tackle")]);
    });
});