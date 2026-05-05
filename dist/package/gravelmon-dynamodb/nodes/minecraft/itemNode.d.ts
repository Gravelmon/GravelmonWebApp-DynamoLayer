import { DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
export declare const ItemEntity = "Item";
export declare class ItemNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    s3TextureLocation?: string;
    isPlaceable: boolean;
    inBattleEffect?: string;
    rebalancedInBattleEffect?: string;
    constructor(name: string, resourceLocation: ResourceLocation, isPlaceable: boolean, s3TextureLocation?: string, inBattleEffect?: string, rebalancedInBattleEffect?: string);
    static deserialize(data: Record<string, any>): ItemNode;
    serialize(): Record<string, any>;
}
export declare function createItemNode(name: string, resourceLocation: ResourceLocation, isPlaceable?: boolean, s3TextureLocation?: string, inBattleEffect?: string, rebalancedInBattleEffect?: string): ItemNode;
