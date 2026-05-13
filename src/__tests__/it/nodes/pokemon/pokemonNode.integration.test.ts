import {GravelmonDynamoDBService} from "../../../../gravelmon-dynamodb";
import {getNodePK} from "../../../../gravelmon-dynamodb";
import {createTestEnv} from "../../../testEnv";
import {
    PokemonData,
    PokemonEntity,
    PokemonIdentifier,
    PokemonNode,
    MoveCategory,
    MoveIdentifier,
    AbilityIdentifier
} from "../../../../gravelmon-dynamodb/nodes";
import {BehaviourOptions, SleepDepth} from "../../../../gravelmon-dynamodb";
import {NumberRange} from "../../../../gravelmon-dynamodb";
import {Time} from "../../../../gravelmon-dynamodb";
import {RidingKey} from "../../../../gravelmon-dynamodb";

import {Stats} from "../../../../gravelmon-dynamodb";
import {MoveSet} from "../../../../gravelmon-dynamodb";
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

describe("PokemonNode Integration Tests", () => {
    const thunderShock = new MoveIdentifier("pokemon", "thundershock");
    const quickAttack = new MoveIdentifier("pokemon", "quick_attack");
    const ironTail = new MoveIdentifier("pokemon", "iron_tail");
    const voltTackle = new MoveIdentifier("pokemon", "volt_tackle");

    const testMoveSet: MoveSet = {
        levelUpMoves: [
            {
                moveName: {
                    moveName: thunderShock,
                    category: MoveCategory.Special,
                    basePower: 40,
                    accuracy: 100,
                    type: "Electric"
                },
                level: 5
            },
            {
                moveName: {
                    moveName: quickAttack,
                    category: MoveCategory.Physical,
                    basePower: 40,
                    accuracy: 100,
                    type: "Normal"
                },
                level: 10
            }
        ],
        teachMoves: [
            {
                moveName: ironTail,
                category: MoveCategory.Physical,
                basePower: 100,
                accuracy: 75,
                type: "Steel"
            }
        ],
        eggMoves: [
            {
                moveName: voltTackle,
                category: MoveCategory.Physical,
                basePower: 120,
                accuracy: 100,
                type: "Electric"
            }
        ],
        legacyMoves: []
    };

    const behaviourOptions: BehaviourOptions = {
        movement: {
            wanderChance: 0.5,
            wanderSpeed: 1.0,
            aquatic: {
                canSwimInWater: true,
                swimSpeed: 0.8,
                canBreatheUnderwater: false
            },
        },



        resting: {
            canSleep: true,
            willSleepOnBed: false,
            light: new NumberRange(0, 7),
            drowsyChance: 0.2,
            depth: SleepDepth.Normal,
            times: [
                {
                    type: "time",
                    value: Time.Night
                }
            ],
            biomes: ["minecraft:plains", "minecraft:forest"]
        },

        herd: {
            maxHerdSize: 5,
            herdData: [
                {
                    tier: 1,
                    pokemon: new PokemonIdentifier("pokemon", "pikachu")
                }
            ]
        }
    };

    const testStats = new Stats(50, 60, 70, 80, 90, 100);

    test("should write and read a PokemonNode from DynamoDB", async () => {
        // Arrange
        const identifier = new PokemonIdentifier("pokemon", "pikachu");

        const pokemonData: PokemonData = {
            pokemonIdentifier: identifier,

            baseStats: testStats,
            rebalancedStats: undefined,
            evYield: testStats,

            heightInDecimeters: 0.4,
            weightInDeciGrams: 6,
            catchRate: 190,
            standingEyeHeight: 0.4,

            maleRatio: 0.5,
            baseExperience: 112,
            baseFriendship: 70,
            eggCycles: 10,

            pokedexEntry: "Electric mouse Pokemon",

            hitbox: { width: 1, height: 1, fixed: false },

            baseScale: 1,
            cannotDynamax: false,
            dropAmount: 1,

            behaviourOptions: behaviourOptions, // keep minimal unless strict type required

            typing: {
                primaryType: "Electric"
            },

            rebalancedTyping: {
                primaryType: "Electric"
            },

            speciesFeatures: ["shiny"],
            labels: ["starter"],
            eggGroups: ["field"],

            experienceGroup: "medium_fast",
            gameIntroducedIn: "pokemon_red",
            riding: {
                landRidingBehaviour: {
                    key: RidingKey.Horse,
                    stats: {
                        ACCELERATION: new NumberRange(0.1, 0.3),
                        JUMP: new NumberRange(0.5, 1.0),
                        SKILL: new NumberRange(0.2, 0.6),
                        SPEED: new NumberRange(1.0, 2.0),
                        STAMINA: new NumberRange(10, 20)
                    },
                    rideSounds: {
                        pitchExpression: "1.0",
                        volumeExpression: "0.8",
                        SoundPK: "SOUND#pokemon#ride",
                        playForPassengers: true,
                        playForNonPassengers: false
                    }
                },

                seats: [
                    {
                        locator: "seat1"
                    }
                ]
            },
            abilities: [
                {
                    identifier: new AbilityIdentifier("pokemon", "static"),
                    isHidden: false,
                    isRebalanced: false,
                    isPlaceholder: false
                }
            ],

            forms: [],

            moveSet: testMoveSet,
            placeholderMoveSet: undefined,
            rebalancedMoveSet: undefined
        };

        const pokemonNode = new PokemonNode(pokemonData, 123456);
        const pk = getNodePK(PokemonEntity, identifier.toString());

        // Act
        await service.putItem(pokemonNode);
        const readNode = await service.getNode(pk) as PokemonNode;

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(PokemonEntity);

        if (readNode && 'pokemonData' in readNode) {
            const data = readNode.pokemonData;

            expect(data.pokemonIdentifier.toString()).toBe(identifier.toString());

            expect(data.baseStats).toEqual(testStats);
            expect(data.evYield).toEqual(testStats);

            expect(data.heightInDecimeters).toBe(0.4);
            expect(data.weightInDeciGrams).toBe(6);

            expect(data.typing.primaryType).toBe("Electric");

            expect(data.labels).toEqual(["starter"]);
            expect(data.speciesFeatures).toEqual(["shiny"]);

            expect(data.moveSet).toEqual(testMoveSet);

            const moveSet = data.moveSet;

            // LEVEL UP MOVES
            expect(moveSet.levelUpMoves).toHaveLength(2);

            expect(moveSet.levelUpMoves[0].level).toBe(5);
            expect(moveSet.levelUpMoves[0].moveName.moveName.toString()).toBe("pokemon#thundershock");
            expect(moveSet.levelUpMoves[0].moveName.type).toBe("Electric");

            expect(moveSet.levelUpMoves[1].level).toBe(10);
            expect(moveSet.levelUpMoves[1].moveName.moveName.toString()).toBe("pokemon#quick_attack");

            // TEACH MOVES
            expect(moveSet.teachMoves).toHaveLength(1);
            expect(moveSet.teachMoves[0].moveName.toString()).toBe("pokemon#iron_tail");
            expect(moveSet.teachMoves[0].type).toBe("Steel");

            // EGG MOVES
            expect(moveSet.eggMoves).toHaveLength(1);
            expect(moveSet.eggMoves[0].moveName.toString()).toBe("pokemon#volt_tackle");

            // LEGACY MOVES
            expect(moveSet.legacyMoves).toHaveLength(0);
        }
    });
});