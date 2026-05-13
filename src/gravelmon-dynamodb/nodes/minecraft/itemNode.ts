import { DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { deserializerRegistry } from '../../service/deserializerRegistry';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const ItemEntity = "Item";

export interface SpawnBaitEffect {
    effects: BaitEffect[];
}

export interface BaitEffect {
    type: string;
    chance: number;
    subcategory?: string;
    value?: number;
}

export class ItemNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    s3TextureLocation?: string;
    isPlaceable: boolean = false;
    spawnBaitEffect?: SpawnBaitEffect;
    inBattleEffect?: string;
    rebalancedInBattleEffect?: string;
    droppedBy?: PokemonIdentifier[]
    usedToEvolve?: PokemonIdentifier[];
    usedWithMechanics?: string[];


    static version = 1;
    constructor(name: string, resourceLocation: ResourceLocation, isPlaceable: boolean, s3TextureLocation?: string, spawnBaitEffect?: SpawnBaitEffect, inBattleEffect?: string, rebalancedInBattleEffect?: string,
                droppedBy?: PokemonIdentifier[], usedToEvolve?: PokemonIdentifier[], usedWithMechanics?: string[]) {
        super(ItemEntity, name);
        this.resourceLocation = resourceLocation;
        this.s3TextureLocation = s3TextureLocation;
        this.isPlaceable = isPlaceable;
        this.inBattleEffect = inBattleEffect;
        this.spawnBaitEffect = spawnBaitEffect;
        this.rebalancedInBattleEffect = rebalancedInBattleEffect;
        this.droppedBy = droppedBy;
        this.usedToEvolve = usedToEvolve;
        this.usedWithMechanics = usedWithMechanics;
        this.version = ItemNode.version;
    }

    static deserialize(data: Record<string, any>): ItemNode {
        if(!data.resourceLocation) {
            throw new Error("Invalid data for deserializing ItemNode: missing resourceLocation");
        }
        return new ItemNode(data.name, ResourceLocation.deserialize(data.resourceLocation), data.isPlaceable, data.s3TextureLocation, data.spawnBaitEffect, data.inBattleEffect, data.rebalancedInBattleEffect,
            data.droppedBy?.map((m: any) => PokemonIdentifier.deserialize(m)), data.usedToEvolve?.map((m: any) => PokemonIdentifier.deserialize(m)),
            data.usedWithMechanics);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            isPlaceable: this.isPlaceable,
            s3TextureLocation: this.s3TextureLocation,
            spawnBaitEffect: this.spawnBaitEffect,
            inBattleEffect: this.inBattleEffect,
            rebalancedInBattleEffect: this.rebalancedInBattleEffect,
            droppedBy: this.droppedBy?.map(m => m.serialize()),
            usedToEvolve: this.usedToEvolve?.map(m => m.serialize()),
            usedWithMechanics: this.usedWithMechanics
        }   
    }
}

deserializerRegistry.register(ItemEntity, ItemNode.deserialize);