import { DynamoNode } from '../../service';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const EggGroupEntity = "EggGroup";
export declare const InEggGroupEdgeType = "InEggGroup";
export declare class EggGroupNode extends DynamoNode {
    pokemonInEggGroup: PokemonIdentifier[];
    static version: number;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): EggGroupNode;
}
