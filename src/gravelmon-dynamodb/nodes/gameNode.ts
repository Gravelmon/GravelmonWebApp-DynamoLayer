import {DynamoNode} from '../service';
import {MoveIdentifier} from "./battle/moveNode";
import {PokemonIdentifier} from "./pokemon/pokemonNode";
import {ResourceLocation} from "../models";
import {deserializerRegistry} from '../service';
import {GameData} from '../models';

export const GameEntity = "Game";

export class GameNode extends DynamoNode {
    gameData: GameData;
    static version = 1;

    constructor(gameData: GameData, lastEdited: number = Date.now()) {
        super(GameEntity, gameData.namespace, GameNode.version, lastEdited);
        this.gameData = gameData;
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        const rawGameData = data.gameData;
        const gameData: GameData = {
            name: rawGameData.name,
            namespace: rawGameData.namespace,
            developer: rawGameData.developer,
            websiteURL: rawGameData.websiteURL,
            isPermitted: rawGameData.isPermitted,
            isEngineCollection: rawGameData.isEngineCollection,
            s3LogoLocation: rawGameData.s3LogoLocation,

            introducesPokemon: Object.fromEntries(
                Object.entries(rawGameData.introducesPokemon).map(
                    ([key, pokemon]) => [
                        key,
                        PokemonIdentifier.deserialize(pokemon)
                    ]
                )
            ),
            introducesItem: rawGameData.introducesItem.map((item: any) => new ResourceLocation(item.namespace, item.path)),
            introducesMoves: rawGameData.introducesMoves.map((move: any) => new MoveIdentifier(move.game, move.move)),
            introducesAbilities: rawGameData.introducesAbilities,
            introducesSpeciesFeatures: rawGameData.introducesSpeciesFeatures,
            introducesMechanics: rawGameData.introducesMechanics,
            introducesTypes: rawGameData.introducesTypes,
            starterPokemon: rawGameData.starterPokemon,

        };
        return new GameNode(gameData, data.lastEdited);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            gameData: {
                name: this.gameData.name,
                namespace: this.gameData.namespace,
                developer: this.gameData.developer,
                websiteURL: this.gameData.websiteURL,
                isPermitted: this.gameData.isPermitted,
                isEngineCollection: this.gameData.isEngineCollection,
                s3LogoLocation: this.gameData.s3LogoLocation,
                introducesPokemon: Object.fromEntries(
                    Object.entries(this.gameData.introducesPokemon).map(([key, value]) => [
                        key,
                        value.serialize()
                    ])
                ),
                introducesItem: this.gameData.introducesItem.map(item => item.serialize()),
                introducesMoves: this.gameData.introducesMoves.map(move => move.serialize()),
                introducesAbilities: this.gameData.introducesAbilities,
                introducesSpeciesFeatures: this.gameData.introducesSpeciesFeatures,
                introducesMechanics: this.gameData.introducesMechanics,
                introducesTypes: this.gameData.introducesTypes,
                starterPokemon: this.gameData.starterPokemon,
            }
        }
    }
}

deserializerRegistry.register(GameEntity, GameNode.deserialize);