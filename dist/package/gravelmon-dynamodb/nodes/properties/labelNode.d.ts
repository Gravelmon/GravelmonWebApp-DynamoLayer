import { DynamoNode } from '../../service/dynamoNodes';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const LabelEntity = "Label";
export declare class LabelNode extends DynamoNode {
    pokemonInLabel: PokemonIdentifier[];
    static version: number;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): LabelNode;
}
