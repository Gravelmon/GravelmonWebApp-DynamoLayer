import { GravelmonDynamoDBService } from "../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { createGameNode } from "../../../gravelmon-dynamodb/nodes/gameNode";
import { GameData } from "../../../gravelmon-dynamodb/models/gameData";
import {createTestEnv} from "../../testEnv";
import {createEggGroupNode} from "../../../gravelmon-dynamodb/nodes";

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

test("should query nodes by entityType using GSI", async () => {
    const redGameData: GameData = {
        name: "Pokemon Red",
        developer: "Game Freak",
        websiteURL: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
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
    const blueGameData: GameData = {
        name: "Pokemon Blue",
        developer: "Game Freak",
        websiteURL: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
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

    const redGameNode = createGameNode(redGameData);
    const blueGameNode = createGameNode(blueGameData);
    const eggGroupNode = createEggGroupNode("test");

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
