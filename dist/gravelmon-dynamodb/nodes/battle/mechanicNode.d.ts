import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from "../../models/minecraft/resourceLocation";
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const MechanicEntity = "Mechanic";
export declare const UsesItemEdgeType = "UsesItem";
export declare const AffectsFormEdgeType = "AffectsForm";
export declare class MechanicNode extends DynamoNode {
    description?: string;
    usesItems?: ResourceLocation[];
    affectsForms?: PokemonIdentifier[];
    constructor(name: string, description?: string, usesItems?: ResourceLocation[], affectsForms?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare function createMechanicNode(name: string, description?: string, usesItems?: ResourceLocation[], affectsForms?: PokemonIdentifier[]): MechanicNode;
export declare function createMechanicAffectsFormEdge(mechanicName: string, pokemonIdentifier: PokemonIdentifier): DynamoEdge;
export declare function createMechanicUsesItemEdge(mechanicName: string, item: ResourceLocation): DynamoEdge;
