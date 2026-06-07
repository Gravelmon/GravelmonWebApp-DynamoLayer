import { DynamoNode } from '../../service';
import { ResourceLocation } from "../../models";
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const MechanicEntity = "Mechanic";
export declare class MechanicNode extends DynamoNode {
    description?: string;
    keyItem?: ResourceLocation;
    usesItems?: ResourceLocation[];
    affectsForms?: PokemonIdentifier[];
    constructor(name: string, description?: string, keyItem?: ResourceLocation, usesItems?: ResourceLocation[], affectsForms?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
