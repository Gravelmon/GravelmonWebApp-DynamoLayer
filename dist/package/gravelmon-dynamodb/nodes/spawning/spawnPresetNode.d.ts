import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { SpawnCondition } from '../../models/spawning/spawnCondition';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
export declare const SpawnPresetEntity = "SpawnPreset";
export interface SpawnPresetOptions {
    name: ResourceLocation;
    condition?: SpawnCondition;
    antiCondition?: SpawnCondition;
}
export declare class SpawnPresetNode extends DynamoNode {
    spawnPresetOptions: SpawnPresetOptions;
    static version: number;
    constructor(spawnPresetOptions: SpawnPresetOptions, lastEdited?: number);
    static deserialize(data: Record<string, any>): SpawnPresetNode;
    serialize(): Record<string, any>;
}
export declare function createSpawnPresetNode(spawnPresetOptions: SpawnPresetOptions): SpawnPresetNode;
export declare function createSpawnPresetDoesNotSpawnInBiomeEdge(spawnPresetName: string, biomeName: string): DynamoEdge;
export declare function createSpawnPresetDoesNotSpawnInBiomeTagEdge(spawnPresetName: string, biomeTagName: string): DynamoEdge;
export declare function createSpawnPresetSpawnsInBiomeEdge(spawnPresetName: string, biomeName: string): DynamoEdge;
export declare function createSpawnPresetSpawnsInBiomeTagEdge(spawnPresetName: string, biomeTagName: string): DynamoEdge;
export declare function createSpawnPresetSpawnsInStructureEdge(spawnPresetName: string, StructureName: string): DynamoEdge;
export declare function createSpawnPresetSpawnsInStructureTagEdge(spawnPresetName: string, StructureTagName: string): DynamoEdge;
export declare function createSpawnPresetDoesNotSpawnInStructureEdge(spawnPresetName: string, StructureName: string): DynamoEdge;
export declare function createSpawnPresetDoesNotSpawnInStructureTagEdge(spawnPresetName: string, StructureTagName: string): DynamoEdge;
