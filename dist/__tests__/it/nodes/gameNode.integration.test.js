"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameNode_1 = require("../../../gravelmon-dynamodb/nodes/gameNode");
const dynamoNodes_1 = require("../../../gravelmon-dynamodb/service/dynamoNodes");
const nodes_1 = require("../../../gravelmon-dynamodb/nodes");
const nodes_2 = require("../../../gravelmon-dynamodb/nodes");
const resourceLocation_1 = require("../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const testEnv_1 = require("../../testEnv");
const tableName = process.env.DYNAMODB_TABLE ||
    `TestGraphTable-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const endpoint = process.env.DYNAMODB_ENDPOINT || "http://localhost:8000";
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
describe("GameNode Integration Tests", () => {
    const introducedPokemon = {
        1: new nodes_1.PokemonIdentifier("Red", "Bulbasaur", "Normal"),
        2: new nodes_1.PokemonIdentifier("Red", "Ivysaur", "Normal"),
        3: new nodes_1.PokemonIdentifier("Red", "Venusaur", "Normal")
    };
    const introducedItems = [
        new resourceLocation_1.ResourceLocation("pokemon", "item/pokedex"),
        new resourceLocation_1.ResourceLocation("pokemon", "item/pokeball")
    ];
    const introducedMoves = [
        new nodes_2.MoveIdentifier("Red", "Tackle"),
        new nodes_2.MoveIdentifier("Red", "Ember")
    ];
    test("should write and read a GameNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const gameData = {
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
        const gameNode = (0, gameNode_1.createGameNode)(gameData);
        const pk = (0, dynamoNodes_1.getNodePK)(gameNode_1.GameEntity, gameData.name);
        // Act: Write the node to DynamoDB
        await service.putItem(gameNode);
        // Act: Read it back
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.name).toBe(gameData.name);
        expect(readNode?.entityType).toBe(gameNode_1.GameEntity);
        // Verify it's a GameNode with proper data
        if (readNode && 'gameData' in readNode) {
            expect(readNode.gameData.developer).toBe(gameData.developer);
            expect(readNode.gameData.wikiPage).toBe(gameData.wikiPage);
            expect(readNode.gameData.isPermitted).toBe(true);
            expect(readNode.gameData.introducesTypes).toEqual(["Normal", "Fire", "Water", "Grass"]);
            expect(readNode.gameData.introducesPokemon).toEqual(introducedPokemon);
            expect(readNode.gameData.introducesItem).toEqual(introducedItems);
            expect(readNode.gameData.introducesMoves).toEqual(introducedMoves);
        }
    });
});
