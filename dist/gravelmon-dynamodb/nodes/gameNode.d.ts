import { DynamoNode } from '../service/dynamoNodes';
import { GameData } from '../models/gameData';
export declare const GameEntity = "Game";
export declare const IntroducesEdgeType = "Introduces";
export declare function createGameNode(gameData: GameData): GameNode;
export declare function deserializeGameNode(data: Record<string, any>): GameNode;
declare class GameNode extends DynamoNode {
    gameData: GameData;
    static version: number;
    constructor(gameData: GameData, lastEdited?: number);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export {};
