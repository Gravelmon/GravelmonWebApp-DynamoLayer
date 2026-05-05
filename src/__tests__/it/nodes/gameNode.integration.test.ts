import {
    DynamoDBClient,
    CreateTableCommand,
    DeleteTableCommand,
    DescribeTableCommand
} from "@aws-sdk/client-dynamodb";
import { DynamoDBGraphService } from "../../../gravelmon-dynamodb/service/dynamoDBGraphService";
import { createGameNode, GameEntity } from "../../../gravelmon-dynamodb/nodes/gameNode";
import { getNodePK } from "../../../gravelmon-dynamodb/service/dynamoNodes";
import { PokemonIdentifier } from "../../../gravelmon-dynamodb/nodes";
import { MoveIdentifier } from "../../../gravelmon-dynamodb/nodes";
import { ResourceLocation } from "../../../gravelmon-dynamodb/models/minecraft/resourceLocation";
import { GameData } from "../../../gravelmon-dynamodb/models/gameData";
import {createTestEnv} from "../../testEnv";

const tableName =
    process.env.DYNAMODB_TABLE ||
    `TestGraphTable-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const endpoint = process.env.DYNAMODB_ENDPOINT || "http://localhost:8000";

let dynamoClient: DynamoDBClient;
let service: DynamoDBGraphService;
let env: ReturnType<typeof createTestEnv>;

beforeAll(async () => {
    env = createTestEnv("game-node")
    await env.createTable();
    service = env.service;
    dynamoClient = env.client;
});

afterAll(async () => {
    env.destroy();
});

describe("GameNode Integration Tests", () => {
    const introducedPokemon = {
        1: new PokemonIdentifier("Red", "Bulbasaur", "Normal"),
        2: new PokemonIdentifier("Red", "Ivysaur", "Normal"),
        3: new PokemonIdentifier("Red", "Venusaur", "Normal")
    };
    const introducedItems = [
        new ResourceLocation("pokemon", "item/pokedex"),
        new ResourceLocation("pokemon", "item/pokeball")
    ];
    const introducedMoves = [
        new MoveIdentifier("Red", "Tackle"),
        new MoveIdentifier("Red", "Ember")
    ];

    test("should write and read a GameNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const gameData : GameData = {
            name: "Pokemon Red",
            developer: "Game Freak",
            wikiPage: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
            isPermitted: true,
            s3LogoLocation: "pokemon-logos/red.png",
            introducesPokemon: introducedPokemon,
            introducesItem: introducedItems,
            introducesMoves: introducedMoves,
            introducesAbilities: ["Overgrow", "Blaze"],
            introducesAspects: ["Pokemon"],
            introducesMechanics: ["Experience", "Leveling"],
            introducesTypes: ["Normal", "Fire", "Water", "Grass"]
        };

        const gameNode = createGameNode(gameData);
        const pk = getNodePK(GameEntity, gameData.name);

        // Act: Write the node to DynamoDB
        await service.putItem(gameNode);

        // Act: Read it back
        const readNode = await service.getNode(pk);

        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.name).toBe(gameData.name);
        expect(readNode?.entityType).toBe(GameEntity);

        // Verify it's a GameNode with proper data
        if (readNode && 'gameData' in readNode) {
            expect((readNode as any).gameData.developer).toBe(gameData.developer);
            expect((readNode as any).gameData.wikiPage).toBe(gameData.wikiPage);
            expect((readNode as any).gameData.isPermitted).toBe(true);
            expect((readNode as any).gameData.introducesTypes).toEqual(["Normal", "Fire", "Water", "Grass"]);
            expect((readNode as any).gameData.introducesPokemon).toEqual(introducedPokemon);
            expect((readNode as any).gameData.introducesItem).toEqual(introducedItems);
            expect((readNode as any).gameData.introducesMoves).toEqual(introducedMoves);
        }
    });
});
