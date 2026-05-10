import { DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const ItemEntity = "Item";
export declare class ItemNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    s3TextureLocation?: string;
    isPlaceable: boolean;
    inBattleEffect?: string;
    rebalancedInBattleEffect?: string;
    droppedBy?: PokemonIdentifier[];
    usedToEvolve?: PokemonIdentifier[];
    usedWithMechanics?: string[];
    static version: number;
    constructor(name: string, resourceLocation: ResourceLocation, isPlaceable: boolean, s3TextureLocation?: string, inBattleEffect?: string, rebalancedInBattleEffect?: string, droppedBy?: PokemonIdentifier[], usedToEvolve?: PokemonIdentifier[], usedWithMechanics?: string[]);
    static deserialize(data: Record<string, any>): ItemNode;
    serialize(): Record<string, any>;
}
