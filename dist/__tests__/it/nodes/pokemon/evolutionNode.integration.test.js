"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const dynamoNodes_1 = require("../../../../gravelmon-dynamodb/service/dynamoNodes");
const nodes_1 = require("../../../../gravelmon-dynamodb/nodes");
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const nodes_2 = require("../../../../gravelmon-dynamodb/nodes");
const evolutionCondition_1 = require("../../../../gravelmon-dynamodb/models/properties/evolutionCondition");
const numberRange_1 = require("../../../../gravelmon-dynamodb/models/properties/numberRange");
const nodes_3 = require("../../../../gravelmon-dynamodb/nodes");
const evolutionCondition_2 = require("../../../../gravelmon-dynamodb/models/properties/evolutionCondition");
let service;
let env;
beforeAll(async () => {
    env = (0, testEnv_1.createTestEnv)("game-node");
    await env.createTable();
    service = env.service;
});
afterAll(async () => {
    env.destroy();
});
describe("EvolutionNode Integration Tests", () => {
    const testEvolutionConditions = [
        // LEVEL
        new evolutionCondition_1.LevelCondition(36),
        // TIME
        new evolutionCondition_2.TimeCondition({
            type: "range",
            value: new numberRange_1.NumberRange(1000, 2000)
        }),
        // RATIO
        new evolutionCondition_1.RatioCondition(evolutionCondition_1.StatRatio.ATTACK_HIGHER),
        // HAS_MOVE
        new evolutionCondition_1.HasMoveCondition(new nodes_3.MoveIdentifier("pokemon_red", "tackle")),
        // HELD_ITEM
        new evolutionCondition_1.HeldItemCondition(new resourceLocation_1.ResourceLocation("minecraft", "water_stone")),
        // GENDER
        new evolutionCondition_1.GenderCondition(evolutionCondition_1.Gender.MALE),
        // FRIENDSHIP
        new evolutionCondition_1.FriendshipCondition(220),
        // PARTY_MEMBER (pokemon)
        new evolutionCondition_1.PartyMemberPokemonCondition(new nodes_1.PokemonIdentifier("pokemon", "pikachu")),
        // PARTY_MEMBER_OF_TYPE
        new evolutionCondition_1.PartyMemberTypeCondition("fire"),
        // BIOME
        new evolutionCondition_1.BiomeCondition(new resourceLocation_1.ResourceLocation("minecraft", "plains")),
        // WEATHER - rain
        new evolutionCondition_1.RainingCondition(true),
        // WEATHER - thunder
        new evolutionCondition_1.ThunderCondition(true),
        // BLOCKS_TRAVELED
        new evolutionCondition_1.BlocksTraveledCondition(5000)
    ];
    it("should serialize and deserialize an EvolutionNode correctly", async () => {
        // -------------------------
        // Arrange
        // -------------------------
        const source = new nodes_1.PokemonIdentifier("pokemon", "pikachu");
        const result = new nodes_1.PokemonIdentifier("pokemon", "raichu");
        const evolutionIdentifier = new nodes_2.EvolutionIdentifier(source, result);
        const evolutionNode = (0, nodes_2.createEvolutionNode)({
            identifier: evolutionIdentifier,
            evolutionType: nodes_2.EvolutionType.ItemInteract,
            consumesHeldItem: true,
            isOptional: false,
            evolutionConditions: testEvolutionConditions,
            needsToHoldItem: new resourceLocation_1.ResourceLocation("minecraft", "thunder_stone"),
            requiresItemUsedOn: new resourceLocation_1.ResourceLocation("minecraft", "player"),
            evolvesFromForm: source,
            evolvesIntoForm: result,
            learnsMovesUponEvolving: [new nodes_3.MoveIdentifier("pokemon_red", "tackle")],
        });
        const pk = (0, dynamoNodes_1.getNodePK)(nodes_2.EvolutionEntity, evolutionIdentifier.toString());
        // -------------------------
        // Act
        // -------------------------
        await service.putItem(evolutionNode);
        const readNode = await service.getNode(pk);
        // -------------------------
        // Assert (node-level)
        // -------------------------
        expect(readNode).not.toBeNull();
        expect(readNode.entityType).toBe(nodes_2.EvolutionEntity);
        // -------------------------
        // Assert identifier
        // -------------------------
        expect(readNode.evolutionOptions.identifier.toString())
            .toBe(evolutionIdentifier.toString());
        expect(readNode.evolutionOptions.evolutionType)
            .toBe(nodes_2.EvolutionType.ItemInteract);
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
        // Assert form links
        // -------------------------
        expect(readNode.evolutionOptions.evolvesFromForm?.toString())
            .toBe(source.toString());
        expect(readNode.evolutionOptions.evolvesIntoForm?.toString())
            .toBe(result.toString());
        // -------------------------
        // Assert move learning
        // -------------------------
        expect(readNode.evolutionOptions.learnsMovesUponEvolving)
            .toEqual([new nodes_3.MoveIdentifier("pokemon_red", "tackle")]);
        // --------------------
        // LEVEL
        // --------------------
        const level = testEvolutionConditions[0];
        expect(level).toBeInstanceOf(evolutionCondition_1.LevelCondition);
        expect(level.type).toBe(evolutionCondition_1.EvolutionConditionType.LEVEL);
        expect(level.name).toBe("level");
        expect(level.condition).toBe("minLevel");
        expect(level.value).toBe(36);
        // --------------------
        // TIME
        // --------------------
        const time = testEvolutionConditions[1];
        expect(time).toBeInstanceOf(evolutionCondition_2.TimeCondition);
        expect(time.type).toBe(evolutionCondition_1.EvolutionConditionType.TIME);
        // narrow the union properly
        expect(time.value.type).toBe("range");
        const range = time.value.value;
        expect(range.min).toBe(1000);
        expect(range.max).toBe(2000);
        // --------------------
        // RATIO
        // --------------------
        const ratio = testEvolutionConditions[2];
        expect(ratio).toBeInstanceOf(evolutionCondition_1.RatioCondition);
        expect(ratio.type).toBe(evolutionCondition_1.EvolutionConditionType.RATIO);
        expect(ratio.value).toBe(evolutionCondition_1.StatRatio.ATTACK_HIGHER);
        // --------------------
        // HAS_MOVE
        // --------------------
        const move = testEvolutionConditions[3];
        expect(move).toBeInstanceOf(evolutionCondition_1.HasMoveCondition);
        expect(move.type).toBe(evolutionCondition_1.EvolutionConditionType.HAS_MOVE);
        expect(move.condition).toBe("move");
        expect(move.value).toBe("tackle");
        // --------------------
        // HELD_ITEM
        // --------------------
        const heldItem = testEvolutionConditions[4];
        expect(heldItem).toBeInstanceOf(evolutionCondition_1.HeldItemCondition);
        expect(heldItem.type).toBe(evolutionCondition_1.EvolutionConditionType.HELD_ITEM);
        expect(heldItem.value.toString()).toBe("minecraft:water_stone");
        // --------------------
        // GENDER
        // --------------------
        const gender = testEvolutionConditions[5];
        expect(gender).toBeInstanceOf(evolutionCondition_1.GenderCondition);
        expect(gender.type).toBe(evolutionCondition_1.EvolutionConditionType.GENDER);
        expect(gender.value).toBe(evolutionCondition_1.Gender.MALE);
        expect(gender.property).toBe("gender=");
        // --------------------
        // FRIENDSHIP
        // --------------------
        const friendship = testEvolutionConditions[6];
        expect(friendship).toBeInstanceOf(evolutionCondition_1.FriendshipCondition);
        expect(friendship.type).toBe(evolutionCondition_1.EvolutionConditionType.FRIENDSHIP);
        expect(friendship.value).toBe(220);
        expect(friendship.condition).toBe("amount");
        // --------------------
        // PARTY MEMBER POKEMON
        // --------------------
        const partyPokemon = testEvolutionConditions[7];
        expect(partyPokemon).toBeInstanceOf(evolutionCondition_1.PartyMemberPokemonCondition);
        expect(partyPokemon.type).toBe(evolutionCondition_1.EvolutionConditionType.PARTY_MEMBER);
        expect(partyPokemon.value.toString()).toBe("pokemon#pikachu");
        // --------------------
        // PARTY MEMBER TYPE
        // --------------------
        const partyType = testEvolutionConditions[8];
        expect(partyType).toBeInstanceOf(evolutionCondition_1.PartyMemberTypeCondition);
        expect(partyType.type).toBe(evolutionCondition_1.EvolutionConditionType.PARTY_MEMBER_OF_TYPE);
        expect(partyType.value).toBe("fire");
        expect(partyType.property).toBe("type=");
        // --------------------
        // BIOME
        // --------------------
        const biome = testEvolutionConditions[9];
        expect(biome).toBeInstanceOf(evolutionCondition_1.BiomeCondition);
        expect(biome.type).toBe(evolutionCondition_1.EvolutionConditionType.BIOME);
        expect(biome.value.toString()).toBe("minecraft:plains");
        // --------------------
        // RAIN
        // --------------------
        const rain = testEvolutionConditions[10];
        expect(rain).toBeInstanceOf(evolutionCondition_1.RainingCondition);
        expect(rain.type).toBe(evolutionCondition_1.EvolutionConditionType.WEATHER);
        expect(rain.value).toBe(true);
        expect(rain.condition).toBe("isRaining");
        // --------------------
        // THUNDER
        // --------------------
        const thunder = testEvolutionConditions[11];
        expect(thunder).toBeInstanceOf(evolutionCondition_1.ThunderCondition);
        expect(thunder.type).toBe(evolutionCondition_1.EvolutionConditionType.WEATHER);
        expect(thunder.value).toBe(true);
        expect(thunder.condition).toBe("isThundering");
        // --------------------
        // BLOCKS TRAVELED
        // --------------------
        const blocks = testEvolutionConditions[12];
        expect(blocks).toBeInstanceOf(evolutionCondition_1.BlocksTraveledCondition);
        expect(blocks.type).toBe(evolutionCondition_1.EvolutionConditionType.BLOCKS_TRAVELED);
        expect(blocks.value).toBe(5000);
        expect(blocks.condition).toBe("amount");
    });
});
