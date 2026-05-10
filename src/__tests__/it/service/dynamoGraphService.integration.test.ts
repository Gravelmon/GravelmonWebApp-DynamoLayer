import { GravelmonDynamoDBService } from "../../../gravelmon-dynamodb/service/gravelmonDynamoDBService";
import { GameData } from "../../../gravelmon-dynamodb/models/gameData";
import {createTestEnv} from "../../testEnv";
import {EggGroupNode, GameNode} from "../../../gravelmon-dynamodb";

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
        namespace: "Pokemon Red",
        developer: "Game Freak",
        websiteURL: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
        isPermitted: true,
        s3LogoLocation: "pokemon-logos/red.png",
        introducesPokemon: {},
        introducesItem: [],
        introducesMoves: [],
        introducesAbilities: [],
        introducesSpeciesFeatures: [],
        introducesMechanics: [],
        introducesTypes: []
    };
    const blueGameData: GameData = {
        name: "Pokemon Blue",
        namespace: "Pokemon Blue",
        developer: "Game Freak",
        websiteURL: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red",
        isPermitted: true,
        s3LogoLocation: "pokemon-logos/red.png",
        introducesPokemon: {},
        introducesItem: [],
        introducesMoves: [],
        introducesAbilities: [],
        introducesSpeciesFeatures: [],
        introducesMechanics: [],
        introducesTypes: []
    };

    const redGameNode = new GameNode(redGameData);
    const blueGameNode = new GameNode(blueGameData);
    const eggGroupNode = new EggGroupNode("test", []);

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
