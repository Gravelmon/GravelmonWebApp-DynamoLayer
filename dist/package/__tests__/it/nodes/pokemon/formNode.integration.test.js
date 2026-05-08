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
            speciesFeatures: [],
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
            speciesFeatures: ["galarian"],
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
                variationForSpeciesFeatureChoice: {
                    speciesFeature: "form",
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
        expect(data.speciesFeatures).toEqual(["galarian"]);
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
        expect(data.resolverData?.variationForSpeciesFeatureChoice).toEqual({
            speciesFeature: "form",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybU5vZGUuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vaXQvbm9kZXMvcG9rZW1vbi9mb3JtTm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQWlEO0FBQ2pELG9GQUErRTtBQUUvRSxnRUFJOEM7QUFFOUMsZ0VBRzhDO0FBRTlDLGtGQUErRTtBQUMvRSwyRkFBd0Y7QUFDeEYsNEZBQTJGO0FBQzNGLHdGQUFnRztBQUNoRyxzRkFBNkc7QUFDN0csa0dBQStGO0FBQy9GLG9GQUcrRDtBQUUvRCx1R0FBb0c7QUFDcEcsOEZBQTJGO0FBQzNGLHNGQUFxRjtBQUVyRixJQUFJLE9BQWlDLENBQUM7QUFDdEMsSUFBSSxHQUFxQyxDQUFDO0FBRTFDLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNqQixHQUFHLEdBQUcsSUFBQSx1QkFBYSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFFeEMsSUFBSSxDQUFDLHVEQUF1RCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBRXJFLDRCQUE0QjtRQUM1QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUkseUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4RSxNQUFNLGFBQWEsR0FBYztZQUM3QixVQUFVLEVBQUUsSUFBSSx5QkFB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QUN6QyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZ3JhdmVsbW9uRHluYW1vREJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVRlc3RFbnYgfSBmcm9tIFwiLi4vLi4vLi4vdGVzdEVudlwiO1xyXG5pbXBvcnQgeyBnZXROb2RlUEsgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZHluYW1vTm9kZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBGb3JtTm9kZSxcclxuICAgIEZvcm1EYXRhLCBGb3JtVHlwZVJlbGF0aW9uc2hpcCwgRm9ybVByaW1hcnlUeXBlRWRnZSwgRm9ybUVudGl0eSwgRm9ybVNlY29uZGFyeVR5cGVFZGdlLFxyXG4gICAgRm9ybUhhc0FiaWxpdHlFZGdlLCBGb3JtSGFzQWJpbGl0eUVkZ2VUeXBlLCBBYmlsaXR5SWRlbnRpZmllciwgY3JlYXRlRm9ybURyb3BzSXRlbUVkZ2VcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL25vZGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgUG9rZW1vbklkZW50aWZpZXIsXHJcbiAgICBQb2tlbW9uRGF0YVxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbm9kZXNcIjtcclxuXHJcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy9zdGF0c1wiO1xyXG5pbXBvcnQgeyBQb3NlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvcG9zZVR5cGVcIjtcclxuaW1wb3J0IHtDb21tb25MYXllck5hbWVzfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9hc3NldHMvcmVzb2x2ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNwYXduVHlwZSwgU3Bhd25EYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvc3Bhd25pbmcvc3Bhd25EYXRhXCI7XHJcbmltcG9ydCB7IFNwYXduYWJsZVBvc2l0aW9uVHlwZSwgU3Bhd25CdWNrZXQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9zcGF3bmluZy9zcGF3bmluZ1wiO1xyXG5pbXBvcnQgeyBTcGF3bkNvbmRpdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3NwYXduaW5nL3NwYXduQ29uZGl0aW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgICBEcm9wc0l0ZW1FZGdlVHlwZSxcclxuICAgIEZvcm1Ecm9wc0l0ZW1FZGdlXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9ub2Rlcy9wb2tlbW9uL2Zvcm1Ob2RlXCI7XHJcblxyXG5pbXBvcnQgeyBSZXNvdXJjZUxvY2F0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvbWluZWNyYWZ0L3Jlc291cmNlTG9jYXRpb25cIjtcclxuaW1wb3J0IHsgTnVtYmVyUmFuZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL251bWJlclJhbmdlXCI7XHJcbmltcG9ydCB7IEl0ZW1FbnRpdHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL25vZGVzL21pbmVjcmFmdC9pdGVtTm9kZVwiO1xyXG5cclxubGV0IHNlcnZpY2U6IEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImZvcm0tbm9kZVwiKTtcclxuICAgIGF3YWl0IGVudi5jcmVhdGVUYWJsZSgpO1xyXG4gICAgc2VydmljZSA9IGVudi5zZXJ2aWNlO1xyXG59KTtcclxuXHJcbmFmdGVyQWxsKGFzeW5jICgpID0+IHtcclxuICAgIGVudi5kZXN0cm95KCk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJGb3JtTm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcblxyXG4gICAgdGVzdChcInNob3VsZCBzZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGEgRm9ybU5vZGUgY29ycmVjdGx5XCIsIGFzeW5jICgpID0+IHtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFycmFuZ2UgUG9rZW1vbkRhdGFcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJwaWthY2h1XCIsIFwiZ2FsYXJcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RTcGF3bkRhdGE6IFNwYXduRGF0YSA9IHtcclxuICAgICAgICAgICAgbGV2ZWxSYW5nZTogbmV3IE51bWJlclJhbmdlKDUsIDIwKSxcclxuXHJcbiAgICAgICAgICAgIHNwYXduVHlwZTogU3Bhd25UeXBlLlBva2Vtb25fSGVyZCxcclxuXHJcbiAgICAgICAgICAgIHNwYXduV2VpZ2h0OiAxLjUsXHJcblxyXG4gICAgICAgICAgICBzcGF3bmFibGVQb3NpdGlvblR5cGVzOiBTcGF3bmFibGVQb3NpdGlvblR5cGUuR3JvdW5kZWQsXHJcblxyXG4gICAgICAgICAgICBzcGF3bkJ1Y2tldDogU3Bhd25CdWNrZXQuUkFSRSxcclxuXHJcbiAgICAgICAgICAgIG1vb25QaGFzZU11bHRpcGxpZXI6IHtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXI6IDEuMlxyXG4gICAgICAgICAgICB9IGFzIGFueSxcclxuXHJcbiAgICAgICAgICAgIHdlaWdodE11bHRpcGxpZXI6IHtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXI6IDAuOFxyXG4gICAgICAgICAgICB9IGFzIGFueSxcclxuXHJcbiAgICAgICAgICAgIG1heEhlcmRTaXplOiA1LFxyXG5cclxuICAgICAgICAgICAgbWluRGlzdGFuY2VCZXR3ZWVuU3Bhd25zOiAxNixcclxuXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogbmV3IFNwYXduQ29uZGl0aW9uKHtcclxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFtcIm1pbmVjcmFmdDpvdmVyd29ybGRcIl0sXHJcbiAgICAgICAgICAgICAgICBjYW5TZWVTa3k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW5ZOiA2MCxcclxuICAgICAgICAgICAgICAgIG1heFk6IDEyMFxyXG4gICAgICAgICAgICB9IGFzIGFueSksXHJcblxyXG4gICAgICAgICAgICBhbnRpQ29uZGl0aW9uOiBuZXcgU3Bhd25Db25kaXRpb24oe1xyXG4gICAgICAgICAgICAgICAgaXNSYWluaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH0gYXMgYW55KSxcclxuXHJcbiAgICAgICAgICAgIGhlcmRTcGF3bkVudHJpZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWRlbnRpZmllcjogbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcInBpZGdleVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlOiBuZXcgTnVtYmVyUmFuZ2UoMywgOCksXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxSYW5nZU9mZnNldDogbmV3IE51bWJlclJhbmdlKC0xLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFRpbWVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVhZGVyOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWRlbnRpZmllcjogbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcImZlYXJvd1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlOiBuZXcgTnVtYmVyUmFuZ2UoMTAsIDI1KSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlT2Zmc2V0OiBuZXcgTnVtYmVyUmFuZ2UoMCwgMiksXHJcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVhZGVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICBwcmVmZXJyZWRCbG9ja3M6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZ3Jhc3NfYmxvY2tcIiksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInRhbGxfZ3Jhc3NcIilcclxuICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgIHJlcXVpcmVkQmxvY2tzOiBbXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImRpcnRcIilcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHBva2Vtb25EYXRhOiBQb2tlbW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgcG9rZW1vbklkZW50aWZpZXI6IGlkZW50aWZpZXIsXHJcbiAgICAgICAgICAgIGJhc2VTdGF0czogbmV3IFN0YXRzKDM1LCA1NSwgNDAsIDUwLCA1MCwgOTApLFxyXG4gICAgICAgICAgICBldllpZWxkOiBuZXcgU3RhdHMoMCwgMCwgMCwgMCwgMCwgMiksXHJcbiAgICAgICAgICAgIGhlaWdodEluTWV0ZXJzOiAwLjQsXHJcbiAgICAgICAgICAgIHdlaWdodEluS2c6IDYsXHJcbiAgICAgICAgICAgIGNhdGNoUmF0ZTogMTkwLFxyXG4gICAgICAgICAgICBtYWxlUmF0aW86IDAuNSxcclxuICAgICAgICAgICAgYmFzZUV4cGVyaWVuY2U6IDExMixcclxuICAgICAgICAgICAgYmFzZUZyaWVuZHNoaXA6IDcwLFxyXG4gICAgICAgICAgICBlZ2dDeWNsZXM6IDEwLFxyXG4gICAgICAgICAgICBwb2tlZGV4RW50cnk6IFwiVGVzdCBQaWthY2h1IEZvcm1cIixcclxuICAgICAgICAgICAgaGl0Ym94OiB7IHdpZHRoOiAwLjYsIGhlaWdodDogMC44IH0sXHJcbiAgICAgICAgICAgIGJhc2VTY2FsZTogMSxcclxuICAgICAgICAgICAgY2Fubm90RHluYW1heDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRyb3BBbW91bnQ6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91ck9wdGlvbnM6IHt9LFxyXG5cclxuICAgICAgICAgICAgdHlwaW5nOiB7IHByaW1hcnlUeXBlOiBcImVsZWN0cmljXCIgfSxcclxuICAgICAgICAgICAgcmViYWxhbmNlZFR5cGluZzogeyBwcmltYXJ5VHlwZTogXCJlbGVjdHJpY1wiIH0sXHJcblxyXG4gICAgICAgICAgICBzcGVjaWVzRmVhdHVyZXM6IFtdLFxyXG4gICAgICAgICAgICBsYWJlbHM6IFtdLFxyXG4gICAgICAgICAgICBlZ2dHcm91cHM6IFtdLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlR3JvdXA6IFwibWVkaXVtX2Zhc3RcIixcclxuICAgICAgICAgICAgZ2FtZUludHJvZHVjZWRJbjogXCJwb2tlbW9uX3N3b3JkXCIsXHJcbiAgICAgICAgICAgIGFiaWxpdGllczogW10sXHJcbiAgICAgICAgICAgIGZvcm1zOiBbXSxcclxuICAgICAgICAgICAgbW92ZVNldDoge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxVcE1vdmVzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRlYWNoTW92ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgZWdnTW92ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgbGVnYWN5TW92ZXM6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQXJyYW5nZSBGb3JtRGF0YVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGlzRm9ybU9mOiBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicGlrYWNodVwiKSxcclxuXHJcbiAgICAgICAgICAgIHNwZWNpZXNGZWF0dXJlczogW1wiZ2FsYXJpYW5cIl0sXHJcblxyXG4gICAgICAgICAgICBsaWdodGluZ0RhdGE6IHtcclxuICAgICAgICAgICAgICAgIGxpZ2h0TGV2ZWw6IDEwLFxyXG4gICAgICAgICAgICAgICAgbGlxdWlkR2xvd01vZGU6IFwiTEFORFwiXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBhZmZlY3RlZEJ5TWVjaGFuaWNzOiBbXCJ3ZWF0aGVyXCJdLFxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZXJEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBsYXllcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IENvbW1vbkxheWVyTmFtZXMuRW1pc3NpdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVOYW1lOiBcInBpa2FjaHVfZ2xvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VtaXNzaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB2YXJpYXRpb25Gb3JTcGVjaWVzRmVhdHVyZUNob2ljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWNpZXNGZWF0dXJlOiBcImZvcm1cIixcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2U6IFwiZ2FsYXJcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcG9zaW5nRGF0YToge1xyXG4gICAgICAgICAgICAgICAgcG9zaW5nRmlsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlU2NhbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUNvb3JkczogeyB4OiAwLCB5OiAwLCB6OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRTY2FsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdENvb3JkczogeyB4OiAwLCB5OiAwLCB6OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdEJvbmU6IFwicm9vdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2VBbmltYXRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zZTogUG9zZVR5cGUuU1RBTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNwYXduRGF0YTogW3Rlc3RTcGF3bkRhdGFdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybU5vZGUgPSBuZXcgRm9ybU5vZGUocG9rZW1vbkRhdGEsIGZvcm1EYXRhLCAxMjM0NTYpO1xyXG4gICAgICAgIGNvbnN0IHBrID0gZ2V0Tm9kZVBLKFwiRm9ybVwiLCBpZGVudGlmaWVyLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQWN0XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGF3YWl0IHNlcnZpY2UucHV0SXRlbShmb3JtTm9kZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZE5vZGUgPSBhd2FpdCBzZXJ2aWNlLmdldE5vZGUocGspIGFzIEZvcm1Ob2RlO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFzc2VydFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUuZW50aXR5VHlwZSkudG9CZShcIkZvcm1cIik7XHJcblxyXG4vLyAtLS0gUG9rZW1vbkRhdGEgY2hlY2tzXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLnBva2Vtb25JZGVudGlmaWVyLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIC50b0JlKGlkZW50aWZpZXIudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlU3RhdHMuaHApLnRvQmUoMzUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlU3RhdHMuYXR0YWNrKS50b0JlKDU1KTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuYmFzZVN0YXRzLmRlZmVuc2UpLnRvQmUoNDApO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlU3RhdHMuc3BlY2lhbEF0dGFjaykudG9CZSg1MCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VTdGF0cy5zcGVjaWFsRGVmZW5zZSkudG9CZSg1MCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VTdGF0cy5zcGVlZCkudG9CZSg5MCk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5ldllpZWxkLnNwZWVkKS50b0JlKDIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5oZWlnaHRJbk1ldGVycykudG9CZSgwLjQpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS53ZWlnaHRJbktnKS50b0JlKDYpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5jYXRjaFJhdGUpLnRvQmUoMTkwKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEubWFsZVJhdGlvKS50b0JlKDAuNSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VFeHBlcmllbmNlKS50b0JlKDExMik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VGcmllbmRzaGlwKS50b0JlKDcwKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuZWdnQ3ljbGVzKS50b0JlKDEwKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEucG9rZWRleEVudHJ5KS50b0JlKFwiVGVzdCBQaWthY2h1IEZvcm1cIik7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5oaXRib3gud2lkdGgpLnRvQmUoMC42KTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuaGl0Ym94LmhlaWdodCkudG9CZSgwLjgpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuYmFzZVNjYWxlKS50b0JlKDEpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5jYW5ub3REeW5hbWF4KS50b0JlKGZhbHNlKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuZHJvcEFtb3VudCkudG9CZSgxKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmV4cGVyaWVuY2VHcm91cCkudG9CZShcIm1lZGl1bV9mYXN0XCIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5nYW1lSW50cm9kdWNlZEluKS50b0JlKFwicG9rZW1vbl9zd29yZFwiKTtcclxuXHJcbi8vIC0tLSBGb3JtRGF0YSBjaGVja3NcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVhZE5vZGUuZm9ybURhdGE7XHJcblxyXG4gICAgICAgIGV4cGVjdChkYXRhLmlzRm9ybU9mLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIC50b0JlKFwicG9rZW1vbiNwaWthY2h1XCIpO1xyXG5cclxuICAgICAgICBleHBlY3QoZGF0YS5zcGVjaWVzRmVhdHVyZXMpLnRvRXF1YWwoW1wiZ2FsYXJpYW5cIl0pO1xyXG5cclxuICAgICAgICBleHBlY3QoZGF0YS5hZmZlY3RlZEJ5TWVjaGFuaWNzKS50b0VxdWFsKFtcIndlYXRoZXJcIl0pO1xyXG5cclxuLy8gbGlnaHRpbmdcclxuICAgICAgICBleHBlY3QoZGF0YS5saWdodGluZ0RhdGEpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEubGlnaHRpbmdEYXRhPy5saWdodExldmVsKS50b0JlKDEwKTtcclxuICAgICAgICBleHBlY3QoZGF0YS5saWdodGluZ0RhdGE/LmxpcXVpZEdsb3dNb2RlKS50b0JlKFwiTEFORFwiKTtcclxuXHJcbi8vIHJlc29sdmVyXHJcbiAgICAgICAgZXhwZWN0KGRhdGEucmVzb2x2ZXJEYXRhKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLnJlc29sdmVyRGF0YT8ubGF5ZXJzLmxlbmd0aCkudG9CZSgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBkYXRhLnJlc29sdmVyRGF0YSEubGF5ZXJzWzBdO1xyXG4gICAgICAgIGV4cGVjdChsYXllci5uYW1lKS50b0JlKENvbW1vbkxheWVyTmFtZXMuRW1pc3NpdmUpO1xyXG4gICAgICAgIGV4cGVjdChsYXllci50ZXh0dXJlTmFtZSkudG9CZShcInBpa2FjaHVfZ2xvd1wiKTtcclxuICAgICAgICBleHBlY3QobGF5ZXIuaXNFbWlzc2l2ZSkudG9CZSh0cnVlKTtcclxuICAgICAgICBleHBlY3QobGF5ZXIubG9vcHMpLnRvQmUodHJ1ZSk7XHJcblxyXG4vLyB2YXJpYXRpb25cclxuICAgICAgICBleHBlY3QoZGF0YS5yZXNvbHZlckRhdGE/LnZhcmlhdGlvbkZvclNwZWNpZXNGZWF0dXJlQ2hvaWNlKS50b0VxdWFsKHtcclxuICAgICAgICAgICAgc3BlY2llc0ZlYXR1cmU6IFwiZm9ybVwiLFxyXG4gICAgICAgICAgICBjaG9pY2U6IFwiZ2FsYXJcIlxyXG4gICAgICAgIH0pO1xyXG5cclxuLy8gcG9zaW5nXHJcbiAgICAgICAgZXhwZWN0KGRhdGEucG9zaW5nRGF0YSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICBjb25zdCBwb3NlRmlsZSA9IGRhdGEucG9zaW5nRGF0YSEucG9zaW5nRmlsZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIGV4cGVjdChwb3NlRmlsZS5wcm9maWxlU2NhbGUpLnRvQmUoMSk7XHJcbiAgICAgICAgZXhwZWN0KHBvc2VGaWxlLnJvb3RCb25lKS50b0JlKFwicm9vdFwiKTtcclxuICAgICAgICBleHBlY3QocG9zZUZpbGUucG9zZUFuaW1hdGlvbnMubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBhbmltID0gcG9zZUZpbGUucG9zZUFuaW1hdGlvbnNbMF07XHJcbiAgICAgICAgZXhwZWN0KGFuaW0ubmFtZSkudG9CZShcImlkbGVcIik7XHJcbiAgICAgICAgZXhwZWN0KGFuaW0ucG9zZSkudG9CZShQb3NlVHlwZS5TVEFORCk7XHJcbiAgICAgICAgZXhwZWN0KGFuaW0uYW5pbWF0aW9ucykudG9FcXVhbChbXSk7XHJcblxyXG4vLyBzcGF3bkRhdGFcclxuICAgICAgICBleHBlY3QoZGF0YS5zcGF3bkRhdGEpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEuc3Bhd25EYXRhIS5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNwYXduID0gZGF0YS5zcGF3bkRhdGEhWzBdO1xyXG5cclxuICAgICAgICBleHBlY3Qoc3Bhd24uc3Bhd25UeXBlKS50b0JlKFNwYXduVHlwZS5Qb2tlbW9uX0hlcmQpO1xyXG4gICAgICAgIGV4cGVjdChzcGF3bi5zcGF3bldlaWdodCkudG9CZSgxLjUpO1xyXG4gICAgICAgIGV4cGVjdChzcGF3bi5tYXhIZXJkU2l6ZSkudG9CZSg1KTtcclxuICAgICAgICBleHBlY3Qoc3Bhd24ubWluRGlzdGFuY2VCZXR3ZWVuU3Bhd25zKS50b0JlKDE2KTtcclxuXHJcbi8vIGxldmVsIHJhbmdlXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLmxldmVsUmFuZ2UubWluKS50b0JlKDUpO1xyXG4gICAgICAgIGV4cGVjdChzcGF3bi5sZXZlbFJhbmdlLm1heCkudG9CZSgyMCk7XHJcblxyXG4vLyBjb25kaXRpb25cclxuICAgICAgICBleHBlY3Qoc3Bhd24uY29uZGl0aW9uPy5zcGF3bkNvbmRpdGlvbk9wdGlvbnMuZGltZW5zaW9ucykudG9Db250YWluKFwibWluZWNyYWZ0Om92ZXJ3b3JsZFwiKTtcclxuICAgICAgICBleHBlY3Qoc3Bhd24uY29uZGl0aW9uPy5zcGF3bkNvbmRpdGlvbk9wdGlvbnMuY2FuU2VlU2t5KS50b0JlKHRydWUpO1xyXG5cclxuLy8gYW50aS1jb25kaXRpb25cclxuICAgICAgICBleHBlY3Qoc3Bhd24uYW50aUNvbmRpdGlvbj8uc3Bhd25Db25kaXRpb25PcHRpb25zLmlzUmFpbmluZykudG9CZSh0cnVlKTtcclxuXHJcbi8vIGhlcmQgZW50cmllc1xyXG4gICAgICAgIGV4cGVjdChzcGF3bi5oZXJkU3Bhd25FbnRyaWVzPy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG4gICAgICAgIGNvbnN0IHBpZGdleSA9IHNwYXduLmhlcmRTcGF3bkVudHJpZXMhWzBdO1xyXG4gICAgICAgIGV4cGVjdChwaWRnZXkucG9rZW1vbklkZW50aWZpZXIudG9TdHJpbmcoKSkudG9CZShcInBva2Vtb24jcGlkZ2V5XCIpO1xyXG4gICAgICAgIGV4cGVjdChwaWRnZXkubGV2ZWxSYW5nZS5taW4pLnRvQmUoMyk7XHJcbiAgICAgICAgZXhwZWN0KHBpZGdleS5sZXZlbFJhbmdlLm1heCkudG9CZSg4KTtcclxuICAgICAgICBleHBlY3QocGlkZ2V5LndlaWdodCkudG9CZSgxMCk7XHJcbiAgICAgICAgZXhwZWN0KHBpZGdleS5pc0xlYWRlcikudG9CZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZlYXJvdyA9IHNwYXduLmhlcmRTcGF3bkVudHJpZXMhWzFdO1xyXG4gICAgICAgIGV4cGVjdChmZWFyb3cucG9rZW1vbklkZW50aWZpZXIudG9TdHJpbmcoKSkudG9CZShcInBva2Vtb24jZmVhcm93XCIpO1xyXG4gICAgICAgIGV4cGVjdChmZWFyb3cuaXNMZWFkZXIpLnRvQmUodHJ1ZSk7XHJcblxyXG4vLyBibG9ja3NcclxuICAgICAgICBleHBlY3Qoc3Bhd24ucHJlZmVycmVkQmxvY2tzPy5tYXAoYiA9PiBiLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICAudG9FcXVhbChbXHJcbiAgICAgICAgICAgICAgICBcIm1pbmVjcmFmdDpncmFzc19ibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJtaW5lY3JhZnQ6dGFsbF9ncmFzc1wiXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICBleHBlY3Qoc3Bhd24ucmVxdWlyZWRCbG9ja3M/LlswXS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAudG9CZShcIm1pbmVjcmFmdDpkaXJ0XCIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJGb3JtVHlwZUVkZ2UgSW50ZWdyYXRpb24gVGVzdFwiLCAoKSA9PiB7XHJcbiAgICB0ZXN0KFwic2hvdWxkIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgYSBQcmltYXJ5VHlwZUVkZ2UgY29ycmVjdGx5XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBBcnJhbmdlXHJcbiAgICAgICAgY29uc3QgcG9rZW1vbiA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJwaWthY2h1XCIpO1xyXG4gICAgICAgIGNvbnN0IHR5cGVOYW1lID0gXCJlbGVjdHJpY1wiO1xyXG5cclxuICAgICAgICBjb25zdCBlZGdlID0gbmV3IEZvcm1QcmltYXJ5VHlwZUVkZ2UoXHJcbiAgICAgICAgICAgIHBva2Vtb24sXHJcbiAgICAgICAgICAgIHR5cGVOYW1lLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAxMjM0NTZcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBwayA9IGVkZ2UuUEs7XHJcblxyXG4gICAgICAgIC8vIEFjdFxyXG4gICAgICAgIGF3YWl0IHNlcnZpY2UucHV0SXRlbShlZGdlKTtcclxuICAgICAgICBjb25zdCByZWFkID0gYXdhaXQgc2VydmljZS5nZXRFZGdlcyhwayk7XHJcblxyXG4gICAgICAgIC8vIEFzc2VydFxyXG4gICAgICAgIGV4cGVjdChyZWFkLmxlbmd0aCkudG9CZSgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVhZEVkZ2UgPSByZWFkWzBdIGFzIEZvcm1QcmltYXJ5VHlwZUVkZ2U7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZSkudG9CZUluc3RhbmNlT2YoRm9ybVByaW1hcnlUeXBlRWRnZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmVudGl0eVR5cGUpLnRvQmUoRm9ybVR5cGVSZWxhdGlvbnNoaXAuUHJpbWFyeVR5cGUpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuaXNSZWJhbGFuY2VkKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5sYXN0RWRpdGVkKS50b0JlKDEyMzQ1Nik7XHJcblxyXG4gICAgICAgIC8vIHN0cnVjdHVyYWwgdmFsaWRhdGlvbiAoaW1wb3J0YW50IGZvciB5b3VyIGJ1ZyBjbGFzcylcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2Uuc291cmNlVHlwZSkudG9CZShcIlR5cGVcIik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnRhcmdldFR5cGUpLnRvQmUoRm9ybUVudGl0eSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KFwic2hvdWxkIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgYSBQcmltYXJ5VHlwZUVkZ2UgY29ycmVjdGx5XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBBcnJhbmdlXHJcbiAgICAgICAgY29uc3QgcG9rZW1vbiA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJwaWthY2h1XCIpO1xyXG4gICAgICAgIGNvbnN0IHR5cGVOYW1lID0gXCJlbGVjdHJpY1wiO1xyXG5cclxuICAgICAgICBjb25zdCBlZGdlID0gbmV3IEZvcm1TZWNvbmRhcnlUeXBlRWRnZShcclxuICAgICAgICAgICAgcG9rZW1vbixcclxuICAgICAgICAgICAgdHlwZU5hbWUsXHJcbiAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgIDEyMzQ1NlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBrID0gZWRnZS5QSztcclxuXHJcbiAgICAgICAgLy8gQWN0XHJcbiAgICAgICAgYXdhaXQgc2VydmljZS5wdXRJdGVtKGVkZ2UpO1xyXG4gICAgICAgIGNvbnN0IHJlYWQgPSBhd2FpdCBzZXJ2aWNlLmdldEVkZ2VzKHBrKTtcclxuXHJcbiAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgZXhwZWN0KHJlYWQubGVuZ3RoKS50b0JlKDIpO1xyXG5cclxuICAgICAgICBjb25zdCByZWFkRWRnZSA9IHJlYWRbMF0gYXMgRm9ybVByaW1hcnlUeXBlRWRnZTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlKS50b0JlSW5zdGFuY2VPZihGb3JtUHJpbWFyeVR5cGVFZGdlKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuZW50aXR5VHlwZSkudG9CZShGb3JtVHlwZVJlbGF0aW9uc2hpcC5QcmltYXJ5VHlwZSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5pc1JlYmFsYW5jZWQpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmxhc3RFZGl0ZWQpLnRvQmUoMTIzNDU2KTtcclxuXHJcbiAgICAgICAgLy8gc3RydWN0dXJhbCB2YWxpZGF0aW9uIChpbXBvcnRhbnQgZm9yIHlvdXIgYnVnIGNsYXNzKVxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5zb3VyY2VUeXBlKS50b0JlKFwiVHlwZVwiKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UudGFyZ2V0VHlwZSkudG9CZShGb3JtRW50aXR5KTtcclxuICAgIH0pO1xyXG59KVxyXG5cclxuZGVzY3JpYmUoXCJGb3JtSGFzQWJpbGl0eUVkZ2UgSW50ZWdyYXRpb24gVGVzdFwiLCAoKSA9PiB7XHJcbiAgICB0ZXN0KFwic2hvdWxkIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgYSBGb3JtSGFzQWJpbGl0eUVkZ2UgY29ycmVjdGx5XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBBcnJhbmdlXHJcbiAgICAgICAgY29uc3QgcG9rZW1vbiA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJwaWthY2h1XCIpO1xyXG4gICAgICAgIGNvbnN0IGFiaWxpdHkgPSBuZXcgQWJpbGl0eUlkZW50aWZpZXIoXCJhYmlsaXR5XCIsIFwic3RhdGljXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBlZGdlID0gbmV3IEZvcm1IYXNBYmlsaXR5RWRnZShcclxuICAgICAgICAgICAgcG9rZW1vbixcclxuICAgICAgICAgICAgYWJpbGl0eSxcclxuICAgICAgICAgICAgdHJ1ZSwgICAvLyBpc0hpZGRlblxyXG4gICAgICAgICAgICBmYWxzZSwgIC8vIGlzUGxhY2Vob2xkZXJcclxuICAgICAgICAgICAgdHJ1ZSwgICAvLyBpc1JlYmFsYW5jZWRcclxuICAgICAgICAgICAgMTIzNDU2XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGsgPSBlZGdlLlBLO1xyXG5cclxuICAgICAgICAvLyBBY3RcclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oZWRnZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZCA9IGF3YWl0IHNlcnZpY2UuZ2V0RWRnZXMocGspO1xyXG5cclxuICAgICAgICAvLyBBc3NlcnRcclxuICAgICAgICBleHBlY3QocmVhZC5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYWRFZGdlID0gcmVhZFswXSBhcyBGb3JtSGFzQWJpbGl0eUVkZ2U7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZSkudG9CZUluc3RhbmNlT2YoRm9ybUhhc0FiaWxpdHlFZGdlKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuZW50aXR5VHlwZSkudG9CZShGb3JtSGFzQWJpbGl0eUVkZ2VUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gZmxhZ3NcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuaXNIaWRkZW4pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmlzUGxhY2Vob2xkZXIpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5pc1JlYmFsYW5jZWQpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmxhc3RFZGl0ZWQpLnRvQmUoMTIzNDU2KTtcclxuXHJcbiAgICAgICAgLy8gc3RydWN0dXJhbCBpbnRlZ3JpdHkgKER5bmFtbyBsYXllcilcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuUEspLnRvQmUoZWRnZS5QSyk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLlNLKS50b0JlKGVkZ2UuU0spO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5zb3VyY2VUeXBlKS50b0JlKFwiQWJpbGl0eVwiKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UudGFyZ2V0VHlwZSkudG9CZShGb3JtRW50aXR5KTtcclxuXHJcbiAgICAgICAgLy8gbmV3IGRvbWFpbiBmaWVsZHNcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UucmVjaXBpZW50KS50b0JlSW5zdGFuY2VPZihQb2tlbW9uSWRlbnRpZmllcik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnJlY2lwaWVudC50b1N0cmluZygpKS50b0JlKHBva2Vtb24udG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5hYmlsaXR5SWRlbnRpZmllcikudG9CZUluc3RhbmNlT2YoQWJpbGl0eUlkZW50aWZpZXIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5hYmlsaXR5SWRlbnRpZmllci50b1N0cmluZygpKS50b0JlKGFiaWxpdHkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbmFsIHNhZmV0eTogZW5zdXJlIHNlcmlhbGl6YXRpb24gcm91bmQtdHJpcCBjb25zaXN0ZW5jeVxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5zZXJpYWxpemUoKS5yZWNpcGllbnQpLnRvRXF1YWwocG9rZW1vbi5zZXJpYWxpemUoKSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnNlcmlhbGl6ZSgpLmFiaWxpdHlJZGVudGlmaWVyKS50b0VxdWFsKGFiaWxpdHkuc2VyaWFsaXplKCkpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJGb3JtRHJvcHNJdGVtRWRnZSBJbnRlZ3JhdGlvbiBUZXN0XCIsICgpID0+IHtcclxuICAgIHRlc3QoXCJzaG91bGQgc2VyaWFsaXplIGFuZCBkZXNlcmlhbGl6ZSBhIEZvcm1Ecm9wc0l0ZW1FZGdlIGNvcnJlY3RseVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicGlrYWNodVwiKTtcclxuICAgICAgICBjb25zdCBpdGVtID0gbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJsaWdodG5pbmdfcm9kXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBxdWFudGl0eVJhbmdlID0gbmV3IE51bWJlclJhbmdlKDEsIDMpO1xyXG5cclxuICAgICAgICBjb25zdCBlZGdlID0gY3JlYXRlRm9ybURyb3BzSXRlbUVkZ2UoXHJcbiAgICAgICAgICAgIGZvcm0sXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIDAuMjUsICAgICAgICAgIC8vIGRyb3BDaGFuY2VcclxuICAgICAgICAgICAgcXVhbnRpdHlSYW5nZSxcclxuICAgICAgICAgICAgMTIzNDU2XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGsgPSBlZGdlLlBLO1xyXG5cclxuICAgICAgICAvLyBBY3RcclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oZWRnZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZCA9IGF3YWl0IHNlcnZpY2UuZ2V0RWRnZXMocGspO1xyXG5cclxuICAgICAgICAvLyBBc3NlcnRcclxuICAgICAgICBleHBlY3QocmVhZC5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYWRFZGdlID0gcmVhZFswXSBhcyBGb3JtRHJvcHNJdGVtRWRnZTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlKS50b0JlSW5zdGFuY2VPZihGb3JtRHJvcHNJdGVtRWRnZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmVudGl0eVR5cGUpLnRvQmUoRHJvcHNJdGVtRWRnZVR5cGUpO1xyXG5cclxuICAgICAgICAvLyBzY2FsYXIgZmllbGRzXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmRyb3BDaGFuY2UpLnRvQmUoMC4yNSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmxhc3RFZGl0ZWQpLnRvQmUoMTIzNDU2KTtcclxuXHJcbiAgICAgICAgLy8gcmFuZ2UgdmFsaWRhdGlvblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5xdWFudGl0eVJhbmdlKS50b0JlSW5zdGFuY2VPZihOdW1iZXJSYW5nZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnF1YW50aXR5UmFuZ2UubWluKS50b0JlKDEpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5xdWFudGl0eVJhbmdlLm1heCkudG9CZSgzKTtcclxuXHJcbiAgICAgICAgLy8gc3RydWN0dXJhbCBpbnRlZ3JpdHlcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuUEspLnRvQmUoZWRnZS5QSyk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLlNLKS50b0JlKGVkZ2UuU0spO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5zb3VyY2VUeXBlKS50b0JlKEl0ZW1FbnRpdHkpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS50YXJnZXRUeXBlKS50b0JlKEZvcm1FbnRpdHkpO1xyXG5cclxuICAgICAgICAvLyBlbnN1cmUgY29ycmVjdCBzZXJpYWxpemF0aW9uIGNvbnRyYWN0XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZCA9IHJlYWRFZGdlLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIGV4cGVjdChzZXJpYWxpemVkLmRyb3BDaGFuY2UpLnRvQmUoMC4yNSk7XHJcbiAgICAgICAgZXhwZWN0KHNlcmlhbGl6ZWQucXVhbnRpdHlSYW5nZS5taW4pLnRvQmUoMSk7XHJcbiAgICAgICAgZXhwZWN0KHNlcmlhbGl6ZWQucXVhbnRpdHlSYW5nZS5tYXgpLnRvQmUoMyk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4iXX0=