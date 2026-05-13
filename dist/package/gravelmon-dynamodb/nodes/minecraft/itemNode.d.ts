import { DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const ItemEntity = "Item";
export interface SpawnBaitEffect {
    effects: BaitEffect[];
}
export interface BaitEffect {
    type: string;
    chance: number;
    subcategory?: string;
    value?: number;
}
export declare class ItemNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    s3TextureLocation?: string;
    isPlaceable: boolean;
    spawnBaitEffect?: SpawnBaitEffect;
    inBattleEffect?: string;
    rebalancedInBattleEffect?: string;
    droppedBy?: PokemonIdentifier[];
    usedToEvolve?: PokemonIdentifier[];
    usedWithMechanics?: string[];
    static version: number;
    constructor(name: string, resourceLocation: ResourceLocation, isPlaceable: boolean, s3TextureLocation?: string, spawnBaitEffect?: SpawnBaitEffect, inBattleEffect?: string, rebalancedInBattleEffect?: string, droppedBy?: PokemonIdentifier[], usedToEvolve?: PokemonIdentifier[], usedWithMechanics?: string[]);
    static deserialize(data: Record<string, any>): ItemNode;
    serialize(): Record<string, any>;
}
