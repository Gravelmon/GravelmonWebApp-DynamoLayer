import { DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from "../../models/minecraft/resourceLocation";
export declare const ModEntity = "Mod";
export declare class ModNode extends DynamoNode {
    displayName: string;
    addsBiomes: ResourceLocation[];
    addsStructures: ResourceLocation[];
    addsItems: ResourceLocation[];
    static version: number;
    constructor(displayName: string, nameSpace: string, addsBiomes: ResourceLocation[], addsStructures: ResourceLocation[], addsItems: ResourceLocation[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): ModNode;
}
