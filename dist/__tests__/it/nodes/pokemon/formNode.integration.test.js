"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testEnv_1 = require("../../../testEnv");
const dynamoNodes_1 = require("../../../../gravelmon-dynamodb/service/dynamoNodes");
const nodes_1 = require("../../../../gravelmon-dynamodb/nodes");
const nodes_2 = require("../../../../gravelmon-dynamodb/nodes");
const stats_1 = require("../../../../gravelmon-dynamodb/models/properties/stats");
const poseType_1 = require("../../../../gravelmon-dynamodb/models/assets/posing/poseType");
const resolverData_1 = require("../../../../gravelmon-dynamodb/models/assets/resolverData");
const spawnData_1 = require("../../../../gravelmon-dynamodb/models/spawning/spawnData");
const spawning_1 = require("../../../../gravelmon-dynamodb/models/spawning/spawning");
const spawnCondition_1 = require("../../../../gravelmon-dynamodb/models/spawning/spawnCondition");
const formNode_1 = require("../../../../gravelmon-dynamodb/nodes/pokemon/formNode");
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const numberRange_1 = require("../../../../gravelmon-dynamodb/models/properties/numberRange");
const itemNode_1 = require("../../../../gravelmon-dynamodb/nodes/minecraft/itemNode");
const tableName = process.env.DYNAMODB_TABLE ||
    `TestGraphTable-${Date.now()}-${Math.random().toString(36).slice(2)}`;
let service;
let env;
beforeAll(async () => {
    env = (0, testEnv_1.createTestEnv)("form-node");
    await env.createTable();
    service = env.service;
});
afterAll(async () => {
    env.destroy();
});
describe("FormNode Integration Tests", () => {
    test("should serialize and deserialize a FormNode correctly", async () => {
        // -------------------------
        // Arrange PokemonData
        // -------------------------
        const identifier = new nodes_2.PokemonIdentifier("pokemon", "pikachu", "galar");
        const testSpawnData = {
            levelRange: new numberRange_1.NumberRange(5, 20),
            spawnType: spawnData_1.SpawnType.Pokemon_Herd,
            spawnWeight: 1.5,
            spawnablePositionTypes: spawning_1.SpawnablePositionType.Grounded,
            spawnBucket: spawning_1.SpawnBucket.RARE,
            moonPhaseMultiplier: {
                multiplier: 1.2
            },
            weightMultiplier: {
                multiplier: 0.8
            },
            maxHerdSize: 5,
            minDistanceBetweenSpawns: 16,
            condition: new spawnCondition_1.SpawnCondition({
                dimensions: ["minecraft:overworld"],
                canSeeSky: true,
                minY: 60,
                maxY: 120
            }),
            antiCondition: new spawnCondition_1.SpawnCondition({
                isRaining: true
            }),
            herdSpawnEntries: [
                {
                    pokemonIdentifier: new nodes_2.PokemonIdentifier("pokemon", "pidgey"),
                    levelRange: new numberRange_1.NumberRange(3, 8),
                    levelRangeOffset: new numberRange_1.NumberRange(-1, 1),
                    weight: 10,
                    maxTimes: 3,
                    isLeader: false
                },
                {
                    pokemonIdentifier: new nodes_2.PokemonIdentifier("pokemon", "fearow"),
                    levelRange: new numberRange_1.NumberRange(10, 25),
                    levelRangeOffset: new numberRange_1.NumberRange(0, 2),
                    weight: 2,
                    isLeader: true
                }
            ],
            preferredBlocks: [
                new resourceLocation_1.ResourceLocation("minecraft", "grass_block"),
                new resourceLocation_1.ResourceLocation("minecraft", "tall_grass")
            ],
            requiredBlocks: [
                new resourceLocation_1.ResourceLocation("minecraft", "dirt")
            ]
        };
        const pokemonData = {
            pokemonIdentifier: identifier,
            baseStats: new stats_1.Stats(35, 55, 40, 50, 50, 90),
            evYield: new stats_1.Stats(0, 0, 0, 0, 0, 2),
            heightInMeters: 0.4,
            weightInKg: 6,
            catchRate: 190,
            maleRatio: 0.5,
            baseExperience: 112,
            baseFriendship: 70,
            eggCycles: 10,
            pokedexEntry: "Test Pikachu Form",
            hitbox: { width: 0.6, height: 0.8 },
            baseScale: 1,
            cannotDynamax: false,
            dropAmount: 1,
            behaviourOptions: {},
            typing: { primaryType: "electric" },
            rebalancedTyping: { primaryType: "electric" },
            aspects: [],
            labels: [],
            eggGroups: [],
            experienceGroup: "medium_fast",
            gameIntroducedIn: "pokemon_sword",
            abilities: [],
            forms: [],
            moveSet: {
                levelUpMoves: [],
                teachMoves: [],
                eggMoves: [],
                legacyMoves: []
            }
        };
        // -------------------------
        // Arrange FormData
        // -------------------------
        const formData = {
            isFormOf: new nodes_2.PokemonIdentifier("pokemon", "pikachu"),
            aspects: ["galarian"],
            lightingData: {
                lightLevel: 10,
                liquidGlowMode: "LAND"
            },
            affectedByMechanics: ["weather"],
            resolverData: {
                layers: [
                    {
                        name: resolverData_1.CommonLayerNames.Emissive,
                        textureName: "pikachu_glow",
                        isEmissive: true,
                        loops: true
                    }
                ],
                variationForAspectChoice: {
                    aspect: "form",
                    choice: "galar"
                }
            },
            posingData: {
                posingFileOptions: {
                    profileScale: 1,
                    profileCoords: { x: 0, y: 0, z: 0 },
                    portraitScale: 1,
                    portraitCoords: { x: 0, y: 0, z: 0 },
                    rootBone: "root",
                    poseAnimations: [
                        {
                            name: "idle",
                            pose: poseType_1.PoseType.STAND,
                            animations: [],
                        }
                    ]
                }
            },
            spawnData: [testSpawnData]
        };
        const formNode = new nodes_1.FormNode(pokemonData, formData, 123456);
        const pk = (0, dynamoNodes_1.getNodePK)("Form", identifier.toString());
        // -------------------------
        // Act
        // -------------------------
        await service.putItem(formNode);
        const readNode = await service.getNode(pk);
        // -------------------------
        // Assert
        // -------------------------
        expect(readNode).not.toBeNull();
        expect(readNode.entityType).toBe("Form");
        // --- PokemonData checks
        expect(readNode.pokemonData.pokemonIdentifier.toString())
            .toBe(identifier.toString());
        expect(readNode.pokemonData.baseStats.hp).toBe(35);
        expect(readNode.pokemonData.baseStats.attack).toBe(55);
        expect(readNode.pokemonData.baseStats.defense).toBe(40);
        expect(readNode.pokemonData.baseStats.specialAttack).toBe(50);
        expect(readNode.pokemonData.baseStats.specialDefense).toBe(50);
        expect(readNode.pokemonData.baseStats.speed).toBe(90);
        expect(readNode.pokemonData.evYield.speed).toBe(2);
        expect(readNode.pokemonData.heightInMeters).toBe(0.4);
        expect(readNode.pokemonData.weightInKg).toBe(6);
        expect(readNode.pokemonData.catchRate).toBe(190);
        expect(readNode.pokemonData.maleRatio).toBe(0.5);
        expect(readNode.pokemonData.baseExperience).toBe(112);
        expect(readNode.pokemonData.baseFriendship).toBe(70);
        expect(readNode.pokemonData.eggCycles).toBe(10);
        expect(readNode.pokemonData.pokedexEntry).toBe("Test Pikachu Form");
        expect(readNode.pokemonData.hitbox.width).toBe(0.6);
        expect(readNode.pokemonData.hitbox.height).toBe(0.8);
        expect(readNode.pokemonData.baseScale).toBe(1);
        expect(readNode.pokemonData.cannotDynamax).toBe(false);
        expect(readNode.pokemonData.dropAmount).toBe(1);
        expect(readNode.pokemonData.experienceGroup).toBe("medium_fast");
        expect(readNode.pokemonData.gameIntroducedIn).toBe("pokemon_sword");
        // --- FormData checks
        const data = readNode.formData;
        expect(data.isFormOf.toString())
            .toBe("pokemon#pikachu");
        expect(data.aspects).toEqual(["galarian"]);
        expect(data.affectedByMechanics).toEqual(["weather"]);
        // lighting
        expect(data.lightingData).toBeDefined();
        expect(data.lightingData?.lightLevel).toBe(10);
        expect(data.lightingData?.liquidGlowMode).toBe("LAND");
        // resolver
        expect(data.resolverData).toBeDefined();
        expect(data.resolverData?.layers.length).toBe(1);
        const layer = data.resolverData.layers[0];
        expect(layer.name).toBe(resolverData_1.CommonLayerNames.Emissive);
        expect(layer.textureName).toBe("pikachu_glow");
        expect(layer.isEmissive).toBe(true);
        expect(layer.loops).toBe(true);
        // variation
        expect(data.resolverData?.variationForAspectChoice).toEqual({
            aspect: "form",
            choice: "galar"
        });
        // posing
        expect(data.posingData).toBeDefined();
        const poseFile = data.posingData.posingFileOptions;
        expect(poseFile.profileScale).toBe(1);
        expect(poseFile.rootBone).toBe("root");
        expect(poseFile.poseAnimations.length).toBe(1);
        const anim = poseFile.poseAnimations[0];
        expect(anim.name).toBe("idle");
        expect(anim.pose).toBe(poseType_1.PoseType.STAND);
        expect(anim.animations).toEqual([]);
        // spawnData
        expect(data.spawnData).toBeDefined();
        expect(data.spawnData.length).toBe(1);
        const spawn = data.spawnData[0];
        expect(spawn.spawnType).toBe(spawnData_1.SpawnType.Pokemon_Herd);
        expect(spawn.spawnWeight).toBe(1.5);
        expect(spawn.maxHerdSize).toBe(5);
        expect(spawn.minDistanceBetweenSpawns).toBe(16);
        // level range
        expect(spawn.levelRange.min).toBe(5);
        expect(spawn.levelRange.max).toBe(20);
        // condition
        expect(spawn.condition?.spawnConditionOptions.dimensions).toContain("minecraft:overworld");
        expect(spawn.condition?.spawnConditionOptions.canSeeSky).toBe(true);
        // anti-condition
        expect(spawn.antiCondition?.spawnConditionOptions.isRaining).toBe(true);
        // herd entries
        expect(spawn.herdSpawnEntries?.length).toBe(2);
        const pidgey = spawn.herdSpawnEntries[0];
        expect(pidgey.pokemonIdentifier.toString()).toBe("pokemon#pidgey");
        expect(pidgey.levelRange.min).toBe(3);
        expect(pidgey.levelRange.max).toBe(8);
        expect(pidgey.weight).toBe(10);
        expect(pidgey.isLeader).toBe(false);
        const fearow = spawn.herdSpawnEntries[1];
        expect(fearow.pokemonIdentifier.toString()).toBe("pokemon#fearow");
        expect(fearow.isLeader).toBe(true);
        // blocks
        expect(spawn.preferredBlocks?.map(b => b.toString()))
            .toEqual([
            "minecraft:grass_block",
            "minecraft:tall_grass"
        ]);
        expect(spawn.requiredBlocks?.[0].toString())
            .toBe("minecraft:dirt");
    });
});
describe("FormTypeEdge Integration Test", () => {
    test("should serialize and deserialize a PrimaryTypeEdge correctly", async () => {
        // Arrange
        const pokemon = new nodes_2.PokemonIdentifier("pokemon", "pikachu");
        const typeName = "electric";
        const edge = new nodes_1.FormPrimaryTypeEdge(pokemon, typeName, true, 123456);
        const pk = edge.PK;
        // Act
        await service.putItem(edge);
        const read = await service.getEdges(pk);
        // Assert
        expect(read.length).toBe(1);
        const readEdge = read[0];
        expect(readEdge).toBeInstanceOf(nodes_1.FormPrimaryTypeEdge);
        expect(readEdge.entityType).toBe(nodes_1.FormTypeRelationship.PrimaryType);
        expect(readEdge.isRebalanced).toBe(true);
        expect(readEdge.lastEdited).toBe(123456);
        // structural validation (important for your bug class)
        expect(readEdge.sourceType).toBe("Type");
        expect(readEdge.targetType).toBe(nodes_1.FormEntity);
    });
    test("should serialize and deserialize a PrimaryTypeEdge correctly", async () => {
        // Arrange
        const pokemon = new nodes_2.PokemonIdentifier("pokemon", "pikachu");
        const typeName = "electric";
        const edge = new nodes_1.FormSecondaryTypeEdge(pokemon, typeName, true, 123456);
        const pk = edge.PK;
        // Act
        await service.putItem(edge);
        const read = await service.getEdges(pk);
        // Assert
        expect(read.length).toBe(2);
        const readEdge = read[0];
        expect(readEdge).toBeInstanceOf(nodes_1.FormPrimaryTypeEdge);
        expect(readEdge.entityType).toBe(nodes_1.FormTypeRelationship.PrimaryType);
        expect(readEdge.isRebalanced).toBe(true);
        expect(readEdge.lastEdited).toBe(123456);
        // structural validation (important for your bug class)
        expect(readEdge.sourceType).toBe("Type");
        expect(readEdge.targetType).toBe(nodes_1.FormEntity);
    });
});
describe("FormHasAbilityEdge Integration Test", () => {
    test("should serialize and deserialize a FormHasAbilityEdge correctly", async () => {
        // Arrange
        const pokemon = new nodes_2.PokemonIdentifier("pokemon", "pikachu");
        const ability = new nodes_1.AbilityIdentifier("ability", "static");
        const edge = new nodes_1.FormHasAbilityEdge(pokemon, ability, true, // isHidden
        false, // isPlaceholder
        true, // isRebalanced
        123456);
        const pk = edge.PK;
        // Act
        await service.putItem(edge);
        const read = await service.getEdges(pk);
        // Assert
        expect(read.length).toBe(1);
        const readEdge = read[0];
        expect(readEdge).toBeInstanceOf(nodes_1.FormHasAbilityEdge);
        expect(readEdge.entityType).toBe(nodes_1.FormHasAbilityEdgeType);
        // flags
        expect(readEdge.isHidden).toBe(true);
        expect(readEdge.isPlaceholder).toBe(false);
        expect(readEdge.isRebalanced).toBe(true);
        expect(readEdge.lastEdited).toBe(123456);
        // structural integrity (Dynamo layer)
        expect(readEdge.PK).toBe(edge.PK);
        expect(readEdge.SK).toBe(edge.SK);
        expect(readEdge.sourceType).toBe("Ability");
        expect(readEdge.targetType).toBe(nodes_1.FormEntity);
        // new domain fields
        expect(readEdge.recipient).toBeInstanceOf(nodes_2.PokemonIdentifier);
        expect(readEdge.recipient.toString()).toBe(pokemon.toString());
        expect(readEdge.abilityIdentifier).toBeInstanceOf(nodes_1.AbilityIdentifier);
        expect(readEdge.abilityIdentifier.toString()).toBe(ability.toString());
        // optional safety: ensure serialization round-trip consistency
        expect(readEdge.serialize().recipient).toEqual(pokemon.serialize());
        expect(readEdge.serialize().abilityIdentifier).toEqual(ability.serialize());
    });
});
describe("FormDropsItemEdge Integration Test", () => {
    test("should serialize and deserialize a FormDropsItemEdge correctly", async () => {
        // Arrange
        const form = new nodes_2.PokemonIdentifier("pokemon", "pikachu");
        const item = new resourceLocation_1.ResourceLocation("minecraft", "lightning_rod");
        const quantityRange = new numberRange_1.NumberRange(1, 3);
        const edge = (0, nodes_1.createFormDropsItemEdge)(form, item, 0.25, // dropChance
        quantityRange, 123456);
        const pk = edge.PK;
        // Act
        await service.putItem(edge);
        const read = await service.getEdges(pk);
        // Assert
        expect(read.length).toBe(1);
        const readEdge = read[0];
        expect(readEdge).toBeInstanceOf(formNode_1.FormDropsItemEdge);
        expect(readEdge.entityType).toBe(formNode_1.DropsItemEdgeType);
        // scalar fields
        expect(readEdge.dropChance).toBe(0.25);
        expect(readEdge.lastEdited).toBe(123456);
        // range validation
        expect(readEdge.quantityRange).toBeInstanceOf(numberRange_1.NumberRange);
        expect(readEdge.quantityRange.min).toBe(1);
        expect(readEdge.quantityRange.max).toBe(3);
        // structural integrity
        expect(readEdge.PK).toBe(edge.PK);
        expect(readEdge.SK).toBe(edge.SK);
        expect(readEdge.sourceType).toBe(itemNode_1.ItemEntity);
        expect(readEdge.targetType).toBe(nodes_1.FormEntity);
        // ensure correct serialization contract
        const serialized = readEdge.serialize();
        expect(serialized.dropChance).toBe(0.25);
        expect(serialized.quantityRange.min).toBe(1);
        expect(serialized.quantityRange.max).toBe(3);
    });
});
