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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybU5vZGUuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vaXQvbm9kZXMvcG9rZW1vbi9mb3JtTm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQWlEO0FBQ2pELG9GQUErRTtBQUUvRSxnRUFJOEM7QUFFOUMsZ0VBRzhDO0FBRTlDLGtGQUErRTtBQUMvRSwyRkFBd0Y7QUFDeEYsNEZBQTJGO0FBQzNGLHdGQUFnRztBQUNoRyxzRkFBNkc7QUFDN0csa0dBQStGO0FBQy9GLG9GQUcrRDtBQUUvRCx1R0FBb0c7QUFDcEcsOEZBQTJGO0FBQzNGLHNGQUFxRjtBQUVyRixJQUFJLE9BQWlDLENBQUM7QUFDdEMsSUFBSSxHQUFxQyxDQUFDO0FBRTFDLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNqQixHQUFHLEdBQUcsSUFBQSx1QkFBYSxFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFFeEMsSUFBSSxDQUFDLHVEQUF1RCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBRXJFLDRCQUE0QjtRQUM1QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUkseUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4RSxNQUFNLGFBQWEsR0FBYztZQUM3QixVQUFVLEVBQUUsSUFBSSx5QkFB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QyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZ3JhdmVsbW9uRHluYW1vREJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVRlc3RFbnYgfSBmcm9tIFwiLi4vLi4vLi4vdGVzdEVudlwiO1xyXG5pbXBvcnQgeyBnZXROb2RlUEsgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZHluYW1vTm9kZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBGb3JtTm9kZSxcclxuICAgIEZvcm1EYXRhLCBGb3JtVHlwZVJlbGF0aW9uc2hpcCwgRm9ybVByaW1hcnlUeXBlRWRnZSwgRm9ybUVudGl0eSwgRm9ybVNlY29uZGFyeVR5cGVFZGdlLFxyXG4gICAgRm9ybUhhc0FiaWxpdHlFZGdlLCBGb3JtSGFzQWJpbGl0eUVkZ2VUeXBlLCBBYmlsaXR5SWRlbnRpZmllciwgY3JlYXRlRm9ybURyb3BzSXRlbUVkZ2VcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL25vZGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgUG9rZW1vbklkZW50aWZpZXIsXHJcbiAgICBQb2tlbW9uRGF0YVxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbm9kZXNcIjtcclxuXHJcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy9zdGF0c1wiO1xyXG5pbXBvcnQgeyBQb3NlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvcG9zZVR5cGVcIjtcclxuaW1wb3J0IHtDb21tb25MYXllck5hbWVzfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9hc3NldHMvcmVzb2x2ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNwYXduVHlwZSwgU3Bhd25EYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvc3Bhd25pbmcvc3Bhd25EYXRhXCI7XHJcbmltcG9ydCB7IFNwYXduYWJsZVBvc2l0aW9uVHlwZSwgU3Bhd25CdWNrZXQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9zcGF3bmluZy9zcGF3bmluZ1wiO1xyXG5pbXBvcnQgeyBTcGF3bkNvbmRpdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3NwYXduaW5nL3NwYXduQ29uZGl0aW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgICBEcm9wc0l0ZW1FZGdlVHlwZSxcclxuICAgIEZvcm1Ecm9wc0l0ZW1FZGdlXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9ub2Rlcy9wb2tlbW9uL2Zvcm1Ob2RlXCI7XHJcblxyXG5pbXBvcnQgeyBSZXNvdXJjZUxvY2F0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvbWluZWNyYWZ0L3Jlc291cmNlTG9jYXRpb25cIjtcclxuaW1wb3J0IHsgTnVtYmVyUmFuZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL251bWJlclJhbmdlXCI7XHJcbmltcG9ydCB7IEl0ZW1FbnRpdHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL25vZGVzL21pbmVjcmFmdC9pdGVtTm9kZVwiO1xyXG5cclxubGV0IHNlcnZpY2U6IEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImZvcm0tbm9kZVwiKTtcclxuICAgIGF3YWl0IGVudi5jcmVhdGVUYWJsZSgpO1xyXG4gICAgc2VydmljZSA9IGVudi5zZXJ2aWNlO1xyXG59KTtcclxuXHJcbmFmdGVyQWxsKGFzeW5jICgpID0+IHtcclxuICAgIGVudi5kZXN0cm95KCk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJGb3JtTm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcblxyXG4gICAgdGVzdChcInNob3VsZCBzZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGEgRm9ybU5vZGUgY29ycmVjdGx5XCIsIGFzeW5jICgpID0+IHtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFycmFuZ2UgUG9rZW1vbkRhdGFcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJwaWthY2h1XCIsIFwiZ2FsYXJcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RTcGF3bkRhdGE6IFNwYXduRGF0YSA9IHtcclxuICAgICAgICAgICAgbGV2ZWxSYW5nZTogbmV3IE51bWJlclJhbmdlKDUsIDIwKSxcclxuXHJcbiAgICAgICAgICAgIHNwYXduVHlwZTogU3Bhd25UeXBlLlBva2Vtb25fSGVyZCxcclxuXHJcbiAgICAgICAgICAgIHNwYXduV2VpZ2h0OiAxLjUsXHJcblxyXG4gICAgICAgICAgICBzcGF3bmFibGVQb3NpdGlvblR5cGVzOiBTcGF3bmFibGVQb3NpdGlvblR5cGUuR3JvdW5kZWQsXHJcblxyXG4gICAgICAgICAgICBzcGF3bkJ1Y2tldDogU3Bhd25CdWNrZXQuUkFSRSxcclxuXHJcbiAgICAgICAgICAgIG1vb25QaGFzZU11bHRpcGxpZXI6IHtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXI6IDEuMlxyXG4gICAgICAgICAgICB9IGFzIGFueSxcclxuXHJcbiAgICAgICAgICAgIHdlaWdodE11bHRpcGxpZXI6IHtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXI6IDAuOFxyXG4gICAgICAgICAgICB9IGFzIGFueSxcclxuXHJcbiAgICAgICAgICAgIG1heEhlcmRTaXplOiA1LFxyXG5cclxuICAgICAgICAgICAgbWluRGlzdGFuY2VCZXR3ZWVuU3Bhd25zOiAxNixcclxuXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogbmV3IFNwYXduQ29uZGl0aW9uKHtcclxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFtcIm1pbmVjcmFmdDpvdmVyd29ybGRcIl0sXHJcbiAgICAgICAgICAgICAgICBjYW5TZWVTa3k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW5ZOiA2MCxcclxuICAgICAgICAgICAgICAgIG1heFk6IDEyMFxyXG4gICAgICAgICAgICB9IGFzIGFueSksXHJcblxyXG4gICAgICAgICAgICBhbnRpQ29uZGl0aW9uOiBuZXcgU3Bhd25Db25kaXRpb24oe1xyXG4gICAgICAgICAgICAgICAgaXNSYWluaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH0gYXMgYW55KSxcclxuXHJcbiAgICAgICAgICAgIGhlcmRTcGF3bkVudHJpZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWRlbnRpZmllcjogbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcInBpZGdleVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlOiBuZXcgTnVtYmVyUmFuZ2UoMywgOCksXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxSYW5nZU9mZnNldDogbmV3IE51bWJlclJhbmdlKC0xLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFRpbWVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVhZGVyOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWRlbnRpZmllcjogbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcImZlYXJvd1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlOiBuZXcgTnVtYmVyUmFuZ2UoMTAsIDI1KSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbFJhbmdlT2Zmc2V0OiBuZXcgTnVtYmVyUmFuZ2UoMCwgMiksXHJcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVhZGVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICBwcmVmZXJyZWRCbG9ja3M6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZ3Jhc3NfYmxvY2tcIiksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInRhbGxfZ3Jhc3NcIilcclxuICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgIHJlcXVpcmVkQmxvY2tzOiBbXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImRpcnRcIilcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHBva2Vtb25EYXRhOiBQb2tlbW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgcG9rZW1vbklkZW50aWZpZXI6IGlkZW50aWZpZXIsXHJcbiAgICAgICAgICAgIGJhc2VTdGF0czogbmV3IFN0YXRzKDM1LCA1NSwgNDAsIDUwLCA1MCwgOTApLFxyXG4gICAgICAgICAgICBldllpZWxkOiBuZXcgU3RhdHMoMCwgMCwgMCwgMCwgMCwgMiksXHJcbiAgICAgICAgICAgIGhlaWdodEluTWV0ZXJzOiAwLjQsXHJcbiAgICAgICAgICAgIHdlaWdodEluS2c6IDYsXHJcbiAgICAgICAgICAgIGNhdGNoUmF0ZTogMTkwLFxyXG4gICAgICAgICAgICBtYWxlUmF0aW86IDAuNSxcclxuICAgICAgICAgICAgYmFzZUV4cGVyaWVuY2U6IDExMixcclxuICAgICAgICAgICAgYmFzZUZyaWVuZHNoaXA6IDcwLFxyXG4gICAgICAgICAgICBlZ2dDeWNsZXM6IDEwLFxyXG4gICAgICAgICAgICBwb2tlZGV4RW50cnk6IFwiVGVzdCBQaWthY2h1IEZvcm1cIixcclxuICAgICAgICAgICAgaGl0Ym94OiB7IHdpZHRoOiAwLjYsIGhlaWdodDogMC44IH0sXHJcbiAgICAgICAgICAgIGJhc2VTY2FsZTogMSxcclxuICAgICAgICAgICAgY2Fubm90RHluYW1heDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRyb3BBbW91bnQ6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91ck9wdGlvbnM6IHt9LFxyXG5cclxuICAgICAgICAgICAgdHlwaW5nOiB7IHByaW1hcnlUeXBlOiBcImVsZWN0cmljXCIgfSxcclxuICAgICAgICAgICAgcmViYWxhbmNlZFR5cGluZzogeyBwcmltYXJ5VHlwZTogXCJlbGVjdHJpY1wiIH0sXHJcblxyXG4gICAgICAgICAgICBhc3BlY3RzOiBbXSxcclxuICAgICAgICAgICAgbGFiZWxzOiBbXSxcclxuICAgICAgICAgICAgZWdnR3JvdXBzOiBbXSxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZUdyb3VwOiBcIm1lZGl1bV9mYXN0XCIsXHJcbiAgICAgICAgICAgIGdhbWVJbnRyb2R1Y2VkSW46IFwicG9rZW1vbl9zd29yZFwiLFxyXG4gICAgICAgICAgICBhYmlsaXRpZXM6IFtdLFxyXG4gICAgICAgICAgICBmb3JtczogW10sXHJcbiAgICAgICAgICAgIG1vdmVTZXQ6IHtcclxuICAgICAgICAgICAgICAgIGxldmVsVXBNb3ZlczogW10sXHJcbiAgICAgICAgICAgICAgICB0ZWFjaE1vdmVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGVnZ01vdmVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGxlZ2FjeU1vdmVzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFycmFuZ2UgRm9ybURhdGFcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0ge1xyXG4gICAgICAgICAgICBpc0Zvcm1PZjogbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcInBpa2FjaHVcIiksXHJcblxyXG4gICAgICAgICAgICBhc3BlY3RzOiBbXCJnYWxhcmlhblwiXSxcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0aW5nRGF0YToge1xyXG4gICAgICAgICAgICAgICAgbGlnaHRMZXZlbDogMTAsXHJcbiAgICAgICAgICAgICAgICBsaXF1aWRHbG93TW9kZTogXCJMQU5EXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGFmZmVjdGVkQnlNZWNoYW5pY3M6IFtcIndlYXRoZXJcIl0sXHJcblxyXG4gICAgICAgICAgICByZXNvbHZlckRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGxheWVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogQ29tbW9uTGF5ZXJOYW1lcy5FbWlzc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZU5hbWU6IFwicGlrYWNodV9nbG93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1pc3NpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHZhcmlhdGlvbkZvckFzcGVjdENob2ljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzcGVjdDogXCJmb3JtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlOiBcImdhbGFyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBvc2luZ0RhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBvc2luZ0ZpbGVPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVDb29yZHM6IHsgeDogMCwgeTogMCwgejogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0U2NhbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRDb29yZHM6IHsgeDogMCwgeTogMCwgejogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RCb25lOiBcInJvb3RcIixcclxuICAgICAgICAgICAgICAgICAgICBwb3NlQW5pbWF0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2U6IFBvc2VUeXBlLlNUQU5ELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzcGF3bkRhdGE6IFt0ZXN0U3Bhd25EYXRhXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1Ob2RlID0gbmV3IEZvcm1Ob2RlKHBva2Vtb25EYXRhLCBmb3JtRGF0YSwgMTIzNDU2KTtcclxuICAgICAgICBjb25zdCBwayA9IGdldE5vZGVQSyhcIkZvcm1cIiwgaWRlbnRpZmllci50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFjdFxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oZm9ybU5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHJlYWROb2RlID0gYXdhaXQgc2VydmljZS5nZXROb2RlKHBrKSBhcyBGb3JtTm9kZTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBc3NlcnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLmVudGl0eVR5cGUpLnRvQmUoXCJGb3JtXCIpO1xyXG5cclxuLy8gLS0tIFBva2Vtb25EYXRhIGNoZWNrc1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5wb2tlbW9uSWRlbnRpZmllci50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAudG9CZShpZGVudGlmaWVyLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuYmFzZVN0YXRzLmhwKS50b0JlKDM1KTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuYmFzZVN0YXRzLmF0dGFjaykudG9CZSg1NSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VTdGF0cy5kZWZlbnNlKS50b0JlKDQwKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuYmFzZVN0YXRzLnNwZWNpYWxBdHRhY2spLnRvQmUoNTApO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlU3RhdHMuc3BlY2lhbERlZmVuc2UpLnRvQmUoNTApO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlU3RhdHMuc3BlZWQpLnRvQmUoOTApO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuZXZZaWVsZC5zcGVlZCkudG9CZSgyKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuaGVpZ2h0SW5NZXRlcnMpLnRvQmUoMC40KTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEud2VpZ2h0SW5LZykudG9CZSg2KTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuY2F0Y2hSYXRlKS50b0JlKDE5MCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLm1hbGVSYXRpbykudG9CZSgwLjUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlRXhwZXJpZW5jZSkudG9CZSgxMTIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5iYXNlRnJpZW5kc2hpcCkudG9CZSg3MCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmVnZ0N5Y2xlcykudG9CZSgxMCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLnBva2VkZXhFbnRyeSkudG9CZShcIlRlc3QgUGlrYWNodSBGb3JtXCIpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuaGl0Ym94LndpZHRoKS50b0JlKDAuNik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmhpdGJveC5oZWlnaHQpLnRvQmUoMC44KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmJhc2VTY2FsZSkudG9CZSgxKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuY2Fubm90RHluYW1heCkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLnBva2Vtb25EYXRhLmRyb3BBbW91bnQpLnRvQmUoMSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5wb2tlbW9uRGF0YS5leHBlcmllbmNlR3JvdXApLnRvQmUoXCJtZWRpdW1fZmFzdFwiKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUucG9rZW1vbkRhdGEuZ2FtZUludHJvZHVjZWRJbikudG9CZShcInBva2Vtb25fc3dvcmRcIik7XHJcblxyXG4vLyAtLS0gRm9ybURhdGEgY2hlY2tzXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlYWROb2RlLmZvcm1EYXRhO1xyXG5cclxuICAgICAgICBleHBlY3QoZGF0YS5pc0Zvcm1PZi50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAudG9CZShcInBva2Vtb24jcGlrYWNodVwiKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGRhdGEuYXNwZWN0cykudG9FcXVhbChbXCJnYWxhcmlhblwiXSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChkYXRhLmFmZmVjdGVkQnlNZWNoYW5pY3MpLnRvRXF1YWwoW1wid2VhdGhlclwiXSk7XHJcblxyXG4vLyBsaWdodGluZ1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmxpZ2h0aW5nRGF0YSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICBleHBlY3QoZGF0YS5saWdodGluZ0RhdGE/LmxpZ2h0TGV2ZWwpLnRvQmUoMTApO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLmxpZ2h0aW5nRGF0YT8ubGlxdWlkR2xvd01vZGUpLnRvQmUoXCJMQU5EXCIpO1xyXG5cclxuLy8gcmVzb2x2ZXJcclxuICAgICAgICBleHBlY3QoZGF0YS5yZXNvbHZlckRhdGEpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGRhdGEucmVzb2x2ZXJEYXRhPy5sYXllcnMubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBsYXllciA9IGRhdGEucmVzb2x2ZXJEYXRhIS5sYXllcnNbMF07XHJcbiAgICAgICAgZXhwZWN0KGxheWVyLm5hbWUpLnRvQmUoQ29tbW9uTGF5ZXJOYW1lcy5FbWlzc2l2ZSk7XHJcbiAgICAgICAgZXhwZWN0KGxheWVyLnRleHR1cmVOYW1lKS50b0JlKFwicGlrYWNodV9nbG93XCIpO1xyXG4gICAgICAgIGV4cGVjdChsYXllci5pc0VtaXNzaXZlKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChsYXllci5sb29wcykudG9CZSh0cnVlKTtcclxuXHJcbi8vIHZhcmlhdGlvblxyXG4gICAgICAgIGV4cGVjdChkYXRhLnJlc29sdmVyRGF0YT8udmFyaWF0aW9uRm9yQXNwZWN0Q2hvaWNlKS50b0VxdWFsKHtcclxuICAgICAgICAgICAgYXNwZWN0OiBcImZvcm1cIixcclxuICAgICAgICAgICAgY2hvaWNlOiBcImdhbGFyXCJcclxuICAgICAgICB9KTtcclxuXHJcbi8vIHBvc2luZ1xyXG4gICAgICAgIGV4cGVjdChkYXRhLnBvc2luZ0RhdGEpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgY29uc3QgcG9zZUZpbGUgPSBkYXRhLnBvc2luZ0RhdGEhLnBvc2luZ0ZpbGVPcHRpb25zO1xyXG5cclxuICAgICAgICBleHBlY3QocG9zZUZpbGUucHJvZmlsZVNjYWxlKS50b0JlKDEpO1xyXG4gICAgICAgIGV4cGVjdChwb3NlRmlsZS5yb290Qm9uZSkudG9CZShcInJvb3RcIik7XHJcbiAgICAgICAgZXhwZWN0KHBvc2VGaWxlLnBvc2VBbmltYXRpb25zLmxlbmd0aCkudG9CZSgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgYW5pbSA9IHBvc2VGaWxlLnBvc2VBbmltYXRpb25zWzBdO1xyXG4gICAgICAgIGV4cGVjdChhbmltLm5hbWUpLnRvQmUoXCJpZGxlXCIpO1xyXG4gICAgICAgIGV4cGVjdChhbmltLnBvc2UpLnRvQmUoUG9zZVR5cGUuU1RBTkQpO1xyXG4gICAgICAgIGV4cGVjdChhbmltLmFuaW1hdGlvbnMpLnRvRXF1YWwoW10pO1xyXG5cclxuLy8gc3Bhd25EYXRhXHJcbiAgICAgICAgZXhwZWN0KGRhdGEuc3Bhd25EYXRhKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIGV4cGVjdChkYXRhLnNwYXduRGF0YSEubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBzcGF3biA9IGRhdGEuc3Bhd25EYXRhIVswXTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLnNwYXduVHlwZSkudG9CZShTcGF3blR5cGUuUG9rZW1vbl9IZXJkKTtcclxuICAgICAgICBleHBlY3Qoc3Bhd24uc3Bhd25XZWlnaHQpLnRvQmUoMS41KTtcclxuICAgICAgICBleHBlY3Qoc3Bhd24ubWF4SGVyZFNpemUpLnRvQmUoNSk7XHJcbiAgICAgICAgZXhwZWN0KHNwYXduLm1pbkRpc3RhbmNlQmV0d2VlblNwYXducykudG9CZSgxNik7XHJcblxyXG4vLyBsZXZlbCByYW5nZVxyXG4gICAgICAgIGV4cGVjdChzcGF3bi5sZXZlbFJhbmdlLm1pbikudG9CZSg1KTtcclxuICAgICAgICBleHBlY3Qoc3Bhd24ubGV2ZWxSYW5nZS5tYXgpLnRvQmUoMjApO1xyXG5cclxuLy8gY29uZGl0aW9uXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLmNvbmRpdGlvbj8uc3Bhd25Db25kaXRpb25PcHRpb25zLmRpbWVuc2lvbnMpLnRvQ29udGFpbihcIm1pbmVjcmFmdDpvdmVyd29ybGRcIik7XHJcbiAgICAgICAgZXhwZWN0KHNwYXduLmNvbmRpdGlvbj8uc3Bhd25Db25kaXRpb25PcHRpb25zLmNhblNlZVNreSkudG9CZSh0cnVlKTtcclxuXHJcbi8vIGFudGktY29uZGl0aW9uXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLmFudGlDb25kaXRpb24/LnNwYXduQ29uZGl0aW9uT3B0aW9ucy5pc1JhaW5pbmcpLnRvQmUodHJ1ZSk7XHJcblxyXG4vLyBoZXJkIGVudHJpZXNcclxuICAgICAgICBleHBlY3Qoc3Bhd24uaGVyZFNwYXduRW50cmllcz8ubGVuZ3RoKS50b0JlKDIpO1xyXG5cclxuICAgICAgICBjb25zdCBwaWRnZXkgPSBzcGF3bi5oZXJkU3Bhd25FbnRyaWVzIVswXTtcclxuICAgICAgICBleHBlY3QocGlkZ2V5LnBva2Vtb25JZGVudGlmaWVyLnRvU3RyaW5nKCkpLnRvQmUoXCJwb2tlbW9uI3BpZGdleVwiKTtcclxuICAgICAgICBleHBlY3QocGlkZ2V5LmxldmVsUmFuZ2UubWluKS50b0JlKDMpO1xyXG4gICAgICAgIGV4cGVjdChwaWRnZXkubGV2ZWxSYW5nZS5tYXgpLnRvQmUoOCk7XHJcbiAgICAgICAgZXhwZWN0KHBpZGdleS53ZWlnaHQpLnRvQmUoMTApO1xyXG4gICAgICAgIGV4cGVjdChwaWRnZXkuaXNMZWFkZXIpLnRvQmUoZmFsc2UpO1xyXG5cclxuICAgICAgICBjb25zdCBmZWFyb3cgPSBzcGF3bi5oZXJkU3Bhd25FbnRyaWVzIVsxXTtcclxuICAgICAgICBleHBlY3QoZmVhcm93LnBva2Vtb25JZGVudGlmaWVyLnRvU3RyaW5nKCkpLnRvQmUoXCJwb2tlbW9uI2ZlYXJvd1wiKTtcclxuICAgICAgICBleHBlY3QoZmVhcm93LmlzTGVhZGVyKS50b0JlKHRydWUpO1xyXG5cclxuLy8gYmxvY2tzXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLnByZWZlcnJlZEJsb2Nrcz8ubWFwKGIgPT4gYi50b1N0cmluZygpKSlcclxuICAgICAgICAgICAgLnRvRXF1YWwoW1xyXG4gICAgICAgICAgICAgICAgXCJtaW5lY3JhZnQ6Z3Jhc3NfYmxvY2tcIixcclxuICAgICAgICAgICAgICAgIFwibWluZWNyYWZ0OnRhbGxfZ3Jhc3NcIlxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHNwYXduLnJlcXVpcmVkQmxvY2tzPy5bMF0udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgLnRvQmUoXCJtaW5lY3JhZnQ6ZGlydFwiKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwiRm9ybVR5cGVFZGdlIEludGVncmF0aW9uIFRlc3RcIiwgKCkgPT4ge1xyXG4gICAgdGVzdChcInNob3VsZCBzZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGEgUHJpbWFyeVR5cGVFZGdlIGNvcnJlY3RseVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgIGNvbnN0IHBva2Vtb24gPSBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicGlrYWNodVwiKTtcclxuICAgICAgICBjb25zdCB0eXBlTmFtZSA9IFwiZWxlY3RyaWNcIjtcclxuXHJcbiAgICAgICAgY29uc3QgZWRnZSA9IG5ldyBGb3JtUHJpbWFyeVR5cGVFZGdlKFxyXG4gICAgICAgICAgICBwb2tlbW9uLFxyXG4gICAgICAgICAgICB0eXBlTmFtZSxcclxuICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgMTIzNDU2XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGsgPSBlZGdlLlBLO1xyXG5cclxuICAgICAgICAvLyBBY3RcclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oZWRnZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZCA9IGF3YWl0IHNlcnZpY2UuZ2V0RWRnZXMocGspO1xyXG5cclxuICAgICAgICAvLyBBc3NlcnRcclxuICAgICAgICBleHBlY3QocmVhZC5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYWRFZGdlID0gcmVhZFswXSBhcyBGb3JtUHJpbWFyeVR5cGVFZGdlO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UpLnRvQmVJbnN0YW5jZU9mKEZvcm1QcmltYXJ5VHlwZUVkZ2UpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5lbnRpdHlUeXBlKS50b0JlKEZvcm1UeXBlUmVsYXRpb25zaGlwLlByaW1hcnlUeXBlKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmlzUmViYWxhbmNlZCkudG9CZSh0cnVlKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UubGFzdEVkaXRlZCkudG9CZSgxMjM0NTYpO1xyXG5cclxuICAgICAgICAvLyBzdHJ1Y3R1cmFsIHZhbGlkYXRpb24gKGltcG9ydGFudCBmb3IgeW91ciBidWcgY2xhc3MpXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnNvdXJjZVR5cGUpLnRvQmUoXCJUeXBlXCIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS50YXJnZXRUeXBlKS50b0JlKEZvcm1FbnRpdHkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGVzdChcInNob3VsZCBzZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGEgUHJpbWFyeVR5cGVFZGdlIGNvcnJlY3RseVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgIGNvbnN0IHBva2Vtb24gPSBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicGlrYWNodVwiKTtcclxuICAgICAgICBjb25zdCB0eXBlTmFtZSA9IFwiZWxlY3RyaWNcIjtcclxuXHJcbiAgICAgICAgY29uc3QgZWRnZSA9IG5ldyBGb3JtU2Vjb25kYXJ5VHlwZUVkZ2UoXHJcbiAgICAgICAgICAgIHBva2Vtb24sXHJcbiAgICAgICAgICAgIHR5cGVOYW1lLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAxMjM0NTZcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBwayA9IGVkZ2UuUEs7XHJcblxyXG4gICAgICAgIC8vIEFjdFxyXG4gICAgICAgIGF3YWl0IHNlcnZpY2UucHV0SXRlbShlZGdlKTtcclxuICAgICAgICBjb25zdCByZWFkID0gYXdhaXQgc2VydmljZS5nZXRFZGdlcyhwayk7XHJcblxyXG4gICAgICAgIC8vIEFzc2VydFxyXG4gICAgICAgIGV4cGVjdChyZWFkLmxlbmd0aCkudG9CZSgyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVhZEVkZ2UgPSByZWFkWzBdIGFzIEZvcm1QcmltYXJ5VHlwZUVkZ2U7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZSkudG9CZUluc3RhbmNlT2YoRm9ybVByaW1hcnlUeXBlRWRnZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmVudGl0eVR5cGUpLnRvQmUoRm9ybVR5cGVSZWxhdGlvbnNoaXAuUHJpbWFyeVR5cGUpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuaXNSZWJhbGFuY2VkKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5sYXN0RWRpdGVkKS50b0JlKDEyMzQ1Nik7XHJcblxyXG4gICAgICAgIC8vIHN0cnVjdHVyYWwgdmFsaWRhdGlvbiAoaW1wb3J0YW50IGZvciB5b3VyIGJ1ZyBjbGFzcylcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2Uuc291cmNlVHlwZSkudG9CZShcIlR5cGVcIik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnRhcmdldFR5cGUpLnRvQmUoRm9ybUVudGl0eSk7XHJcbiAgICB9KTtcclxufSlcclxuXHJcbmRlc2NyaWJlKFwiRm9ybUhhc0FiaWxpdHlFZGdlIEludGVncmF0aW9uIFRlc3RcIiwgKCkgPT4ge1xyXG4gICAgdGVzdChcInNob3VsZCBzZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGEgRm9ybUhhc0FiaWxpdHlFZGdlIGNvcnJlY3RseVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgIGNvbnN0IHBva2Vtb24gPSBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicGlrYWNodVwiKTtcclxuICAgICAgICBjb25zdCBhYmlsaXR5ID0gbmV3IEFiaWxpdHlJZGVudGlmaWVyKFwiYWJpbGl0eVwiLCBcInN0YXRpY1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRnZSA9IG5ldyBGb3JtSGFzQWJpbGl0eUVkZ2UoXHJcbiAgICAgICAgICAgIHBva2Vtb24sXHJcbiAgICAgICAgICAgIGFiaWxpdHksXHJcbiAgICAgICAgICAgIHRydWUsICAgLy8gaXNIaWRkZW5cclxuICAgICAgICAgICAgZmFsc2UsICAvLyBpc1BsYWNlaG9sZGVyXHJcbiAgICAgICAgICAgIHRydWUsICAgLy8gaXNSZWJhbGFuY2VkXHJcbiAgICAgICAgICAgIDEyMzQ1NlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBrID0gZWRnZS5QSztcclxuXHJcbiAgICAgICAgLy8gQWN0XHJcbiAgICAgICAgYXdhaXQgc2VydmljZS5wdXRJdGVtKGVkZ2UpO1xyXG4gICAgICAgIGNvbnN0IHJlYWQgPSBhd2FpdCBzZXJ2aWNlLmdldEVkZ2VzKHBrKTtcclxuXHJcbiAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgZXhwZWN0KHJlYWQubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCByZWFkRWRnZSA9IHJlYWRbMF0gYXMgRm9ybUhhc0FiaWxpdHlFZGdlO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UpLnRvQmVJbnN0YW5jZU9mKEZvcm1IYXNBYmlsaXR5RWRnZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmVudGl0eVR5cGUpLnRvQmUoRm9ybUhhc0FiaWxpdHlFZGdlVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIGZsYWdzXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLmlzSGlkZGVuKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5pc1BsYWNlaG9sZGVyKS50b0JlKGZhbHNlKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuaXNSZWJhbGFuY2VkKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5sYXN0RWRpdGVkKS50b0JlKDEyMzQ1Nik7XHJcblxyXG4gICAgICAgIC8vIHN0cnVjdHVyYWwgaW50ZWdyaXR5IChEeW5hbW8gbGF5ZXIpXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLlBLKS50b0JlKGVkZ2UuUEspO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5TSykudG9CZShlZGdlLlNLKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2Uuc291cmNlVHlwZSkudG9CZShcIkFiaWxpdHlcIik7XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnRhcmdldFR5cGUpLnRvQmUoRm9ybUVudGl0eSk7XHJcblxyXG4gICAgICAgIC8vIG5ldyBkb21haW4gZmllbGRzXHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLnJlY2lwaWVudCkudG9CZUluc3RhbmNlT2YoUG9rZW1vbklkZW50aWZpZXIpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5yZWNpcGllbnQudG9TdHJpbmcoKSkudG9CZShwb2tlbW9uLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuYWJpbGl0eUlkZW50aWZpZXIpLnRvQmVJbnN0YW5jZU9mKEFiaWxpdHlJZGVudGlmaWVyKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UuYWJpbGl0eUlkZW50aWZpZXIudG9TdHJpbmcoKSkudG9CZShhYmlsaXR5LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25hbCBzYWZldHk6IGVuc3VyZSBzZXJpYWxpemF0aW9uIHJvdW5kLXRyaXAgY29uc2lzdGVuY3lcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2Uuc2VyaWFsaXplKCkucmVjaXBpZW50KS50b0VxdWFsKHBva2Vtb24uc2VyaWFsaXplKCkpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5zZXJpYWxpemUoKS5hYmlsaXR5SWRlbnRpZmllcikudG9FcXVhbChhYmlsaXR5LnNlcmlhbGl6ZSgpKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwiRm9ybURyb3BzSXRlbUVkZ2UgSW50ZWdyYXRpb24gVGVzdFwiLCAoKSA9PiB7XHJcbiAgICB0ZXN0KFwic2hvdWxkIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgYSBGb3JtRHJvcHNJdGVtRWRnZSBjb3JyZWN0bHlcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIC8vIEFycmFuZ2VcclxuICAgICAgICBjb25zdCBmb3JtID0gbmV3IFBva2Vtb25JZGVudGlmaWVyKFwicG9rZW1vblwiLCBcInBpa2FjaHVcIik7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwibGlnaHRuaW5nX3JvZFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlSYW5nZSA9IG5ldyBOdW1iZXJSYW5nZSgxLCAzKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRnZSA9IGNyZWF0ZUZvcm1Ecm9wc0l0ZW1FZGdlKFxyXG4gICAgICAgICAgICBmb3JtLFxyXG4gICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICAwLjI1LCAgICAgICAgICAvLyBkcm9wQ2hhbmNlXHJcbiAgICAgICAgICAgIHF1YW50aXR5UmFuZ2UsXHJcbiAgICAgICAgICAgIDEyMzQ1NlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBrID0gZWRnZS5QSztcclxuXHJcbiAgICAgICAgLy8gQWN0XHJcbiAgICAgICAgYXdhaXQgc2VydmljZS5wdXRJdGVtKGVkZ2UpO1xyXG4gICAgICAgIGNvbnN0IHJlYWQgPSBhd2FpdCBzZXJ2aWNlLmdldEVkZ2VzKHBrKTtcclxuXHJcbiAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgZXhwZWN0KHJlYWQubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCByZWFkRWRnZSA9IHJlYWRbMF0gYXMgRm9ybURyb3BzSXRlbUVkZ2U7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZSkudG9CZUluc3RhbmNlT2YoRm9ybURyb3BzSXRlbUVkZ2UpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5lbnRpdHlUeXBlKS50b0JlKERyb3BzSXRlbUVkZ2VUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gc2NhbGFyIGZpZWxkc1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5kcm9wQ2hhbmNlKS50b0JlKDAuMjUpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5sYXN0RWRpdGVkKS50b0JlKDEyMzQ1Nik7XHJcblxyXG4gICAgICAgIC8vIHJhbmdlIHZhbGlkYXRpb25cclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UucXVhbnRpdHlSYW5nZSkudG9CZUluc3RhbmNlT2YoTnVtYmVyUmFuZ2UpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5xdWFudGl0eVJhbmdlLm1pbikudG9CZSgxKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UucXVhbnRpdHlSYW5nZS5tYXgpLnRvQmUoMyk7XHJcblxyXG4gICAgICAgIC8vIHN0cnVjdHVyYWwgaW50ZWdyaXR5XHJcbiAgICAgICAgZXhwZWN0KHJlYWRFZGdlLlBLKS50b0JlKGVkZ2UuUEspO1xyXG4gICAgICAgIGV4cGVjdChyZWFkRWRnZS5TSykudG9CZShlZGdlLlNLKTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2Uuc291cmNlVHlwZSkudG9CZShJdGVtRW50aXR5KTtcclxuICAgICAgICBleHBlY3QocmVhZEVkZ2UudGFyZ2V0VHlwZSkudG9CZShGb3JtRW50aXR5KTtcclxuXHJcbiAgICAgICAgLy8gZW5zdXJlIGNvcnJlY3Qgc2VyaWFsaXphdGlvbiBjb250cmFjdFxyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSByZWFkRWRnZS5zZXJpYWxpemUoKTtcclxuICAgICAgICBleHBlY3Qoc2VyaWFsaXplZC5kcm9wQ2hhbmNlKS50b0JlKDAuMjUpO1xyXG4gICAgICAgIGV4cGVjdChzZXJpYWxpemVkLnF1YW50aXR5UmFuZ2UubWluKS50b0JlKDEpO1xyXG4gICAgICAgIGV4cGVjdChzZXJpYWxpemVkLnF1YW50aXR5UmFuZ2UubWF4KS50b0JlKDMpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIl19