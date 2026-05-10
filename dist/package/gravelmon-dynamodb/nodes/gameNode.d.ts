import { DynamoNode } from '../service/dynamoNodes';
import { GameData } from '../models/gameData';
export declare const GameEntity = "Game";
export declare class GameNode extends DynamoNode {
    gameData: GameData;
    static version: number;
    constructor(gameData: GameData, lastEdited?: number);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
