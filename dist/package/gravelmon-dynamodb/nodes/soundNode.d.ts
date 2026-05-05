import { SoundData } from '../models/soundData';
import { DynamoEdge, DynamoNode } from '../service/dynamoNodes';
import { PokemonIdentifier } from './pokemon/pokemonNode';
export declare const SoundEntity = "Sound";
export declare const SoundUsedByEdgeType = "UsedBy";
declare class SoundNode extends DynamoNode {
    soundData: SoundData;
    static version: number;
    constructor(soundData: SoundData, lastEdited?: number);
    static deserialize(data: Record<string, any>): SoundNode;
    serialize(): Record<string, any>;
}
export declare function createSoundNode(soundData: SoundData): SoundNode;
export declare function createSoundUsedByPokemonEdge(soundName: string, pokemonIdentifier: PokemonIdentifier): DynamoEdge;
export declare function createSoundUsedByFormEdge(soundName: string, formIdentifier: PokemonIdentifier): DynamoEdge;
export {};
