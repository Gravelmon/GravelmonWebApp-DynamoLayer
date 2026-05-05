import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
export declare const StructureEntity = "Structure";
export declare const StructureTagEntity = "StructureTag";
export declare const ContainedInStructureTagEdgeType = "ContainedInStructureTag";
export declare const SpawnsInStructureEdgeType = "SpawnsInStructure";
export declare const DoesNotSpawnInStructureEdgeType = "DoesNotSpawnInStructure";
export declare class StructureNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    constructor(resourceLocation: ResourceLocation);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare class StructureTagNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containsStructures: ResourceLocation[];
    constructor(resourceLocation: ResourceLocation, containsStructures?: ResourceLocation[]);
    static deserialize(data: Record<string, any>): StructureTagNode;
    serialize(): Record<string, any>;
}
export declare function createStructureNode(resourceLocation: ResourceLocation): DynamoNode;
export declare function createStructureTagNode(resourceLocation: ResourceLocation, containsStructures?: ResourceLocation[]): StructureTagNode;
export declare function createStructureTagContainsStructureEdge(StructureTagName: ResourceLocation, StructureName: ResourceLocation): DynamoEdge;
export declare function createStructureTagContainsStructureTagEdge(containingStructureTagName: ResourceLocation, subjectStructureTagName: ResourceLocation): DynamoEdge;
