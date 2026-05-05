"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntroducesEdgeType = exports.GameEntity = void 0;
exports.createGameNode = createGameNode;
exports.deserializeGameNode = deserializeGameNode;
const dynamoNodes_1 = require("../service/dynamoNodes");
const moveNode_1 = require("./battle/moveNode");
const pokemonNode_1 = require("./pokemon/pokemonNode");
const resourceLocation_1 = require("../models/minecraft/resourceLocation");
const deserializerRegistry_1 = require("../service/deserializerRegistry");
exports.GameEntity = "Game";
exports.IntroducesEdgeType = "Introduces";
function createGameNode(gameData) {
    return new GameNode(gameData);
}
function deserializeGameNode(data) {
    return new GameNode(data.gameData);
}
class GameNode extends dynamoNodes_1.DynamoNode {
    constructor(gameData, lastEdited = Date.now()) {
        super(exports.GameEntity, gameData.name, GameNode.version, lastEdited);
        this.gameData = gameData;
    }
    static deserialize(data) {
        const rawGameData = data.gameData;
        const gameData = {
            name: rawGameData.name,
            namespace: rawGameData.namespace,
            developer: rawGameData.developer,
            wikiPage: rawGameData.wikiPage,
            isPermitted: rawGameData.isPermitted,
            s3LogoLocation: rawGameData.s3LogoLocation,
            introducesPokemon: Object.fromEntries(Object.entries(rawGameData.introducesPokemon).map(([key, pokemon]) => [
                key,
                pokemonNode_1.PokemonIdentifier.deserialize(pokemon)
            ])),
            introducesItem: rawGameData.introducesItem.map((item) => new resourceLocation_1.ResourceLocation(item.namespace, item.path)),
            introducesMoves: rawGameData.introducesMoves.map((move) => new moveNode_1.MoveIdentifier(move.game, move.move)),
            introducesAbilities: rawGameData.introducesAbilities,
            introducesAspects: rawGameData.introducesAspects,
            introducesMechanics: rawGameData.introducesMechanics,
            introducesTypes: rawGameData.introducesTypes
        };
        return new GameNode(gameData, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            gameData: {
                name: this.gameData.name,
                namespace: this.gameData.namespace,
                developer: this.gameData.developer,
                wikiPage: this.gameData.wikiPage,
                isPermitted: this.gameData.isPermitted,
                s3LogoLocation: this.gameData.s3LogoLocation,
                introducesPokemon: Object.fromEntries(Object.entries(this.gameData.introducesPokemon).map(([key, value]) => [
                    key,
                    value.serialize()
                ])),
                introducesItem: this.gameData.introducesItem.map(item => item.serialize()),
                introducesMoves: this.gameData.introducesMoves.map(move => move.serialize()),
                introducesAbilities: this.gameData.introducesAbilities,
                introducesAspects: this.gameData.introducesAspects,
                introducesMechanics: this.gameData.introducesMechanics,
                introducesTypes: this.gameData.introducesTypes
            }
        };
    }
}
GameNode.version = 1;
deserializerRegistry_1.deserializerRegistry.register(exports.GameEntity, GameNode.deserialize);
