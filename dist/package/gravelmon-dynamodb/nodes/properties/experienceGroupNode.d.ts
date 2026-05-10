import { DynamoNode } from '../../service/dynamoNodes';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const ExperienceGroupEntity = "ExperienceGroup";
export declare class ExperienceGroupNode extends DynamoNode {
    pokemonInExperienceGroup: PokemonIdentifier[];
    static version: number;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): ExperienceGroupNode;
}
