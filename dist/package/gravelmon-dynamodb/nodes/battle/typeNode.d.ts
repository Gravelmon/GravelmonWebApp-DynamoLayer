import { DynamoNode } from '../../service/dynamoNodes';
import { MoveIdentifier } from "./moveNode";
import { FieldEffectIdentifier } from "./fieldEffectNode";
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const TypeEntity = "Type";
export interface TypeInteractions {
    resists: string[];
    immunities: string[];
    weaknesses: string[];
    secondaryEffect?: string;
}
export declare class TypeNode extends DynamoNode {
    introducedByGames: string[];
    typeInteractions: TypeInteractions;
    rebalancedTypeInteractions: TypeInteractions;
    moves: MoveIdentifier[];
    associatedFieldEffects: FieldEffectIdentifier[];
    pokemon: PokemonIdentifier[];
    constructor(name: string, typeInteractions: TypeInteractions, introducedByGames: string[], moves: MoveIdentifier[], associatedFieldEffects: FieldEffectIdentifier[], pokemon: PokemonIdentifier[], rebalancedTypeInteractions?: TypeInteractions);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): DynamoNode;
}
