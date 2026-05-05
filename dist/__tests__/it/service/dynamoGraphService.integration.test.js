"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameNode_1 = require("../../../gravelmon-dynamodb/nodes/gameNode");
const testEnv_1 = require("../../testEnv");
const nodes_1 = require("../../../gravelmon-dynamodb/nodes");
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
test("should query nodes by entityType using GSI", async () => {
    const redGameData = {
        name: "Pokemon Red",
        developer: "Game Freak",
        wikiPage: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
        isPermitted: true,
        s3LogoLocation: "pokemon-logos/red.png",
        introducesPokemon: {},
        introducesItem: [],
        introducesMoves: [],
        introducesAbilities: [],
        introducesAspects: [],
        introducesMechanics: [],
        introducesTypes: []
    };
    const blueGameData = {
        name: "Pokemon Blue",
        developer: "Game Freak",
        wikiPage: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
        isPermitted: true,
        s3LogoLocation: "pokemon-logos/red.png",
        introducesPokemon: {},
        introducesItem: [],
        introducesMoves: [],
        introducesAbilities: [],
        introducesAspects: [],
        introducesMechanics: [],
        introducesTypes: []
    };
    const redGameNode = (0, gameNode_1.createGameNode)(redGameData);
    const blueGameNode = (0, gameNode_1.createGameNode)(blueGameData);
    const eggGroupNode = (0, nodes_1.createEggGroupNode)("test");
    await service.putItem(redGameNode);
    await service.putItem(blueGameNode);
    await service.putItem(eggGroupNode);
    const results = await service.queryByEntityType("Game");
    expect(results.length).toBe(2);
    expect(results[0].entityType).toBe("Game");
    expect(results[1].entityType).toBe("Game");
});
test("should return null when node does not exist", async () => {
    // Act
    const node = await service.getNode("NODE#Game#NonExistentGame");
    // Assert
    expect(node).toBeNull();
});
