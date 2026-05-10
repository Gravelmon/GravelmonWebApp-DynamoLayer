import { SoundData } from '../models/soundData';
import { DynamoNode } from '../service/dynamoNodes';
import { PokemonIdentifier } from './pokemon/pokemonNode';
export declare const SoundEntity = "Sound";
export declare class SoundNode extends DynamoNode {
    soundData: SoundData;
    usedBy: PokemonIdentifier[];
    static version: number;
    constructor(soundData: SoundData, usedBy: PokemonIdentifier[], lastEdited?: number);
    static deserialize(data: Record<string, any>): SoundNode;
    serialize(): Record<string, any>;
}
