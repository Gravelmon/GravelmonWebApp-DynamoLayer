import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
export declare const BiomeEntity = "Biome";
export declare const BiomeTagEntity = "BiomeTag";
export declare const BiomeTagContainsBiomeEdgeType = "ContainedInBiomeTag";
export declare const SpawnsInBiomeEdgeType = "SpawnsInBiome";
export declare const DoesNotSpawnInBiomeEdgeType = "DoesNotSpawnInBiome";
export declare class BiomeNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    constructor(resourceLocation: ResourceLocation);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare class BiomeTagNode extends DynamoNode {
    containsBiomes: ResourceLocation[];
    resourceLocation: ResourceLocation;
    constructor(resourceLocation: ResourceLocation, containsBiomes?: ResourceLocation[]);
    static deserialize(data: Record<string, any>): BiomeTagNode;
    serialize(): Record<string, any>;
}
export declare function createBiomeNode(resourceLocation: ResourceLocation): DynamoNode;
export declare function createBiomeTagNode(resourceLocation: ResourceLocation, containsBiomes?: ResourceLocation[]): BiomeTagNode;
export declare function createBiomeTagContainsBiomeEdge(biomeTagName: ResourceLocation, biomeName: ResourceLocation): DynamoEdge;
export declare function createBiomeTagContainsBiomeTagEdge(containingBiomeTag: ResourceLocation, subjectBiomeTag: ResourceLocation): DynamoEdge;
