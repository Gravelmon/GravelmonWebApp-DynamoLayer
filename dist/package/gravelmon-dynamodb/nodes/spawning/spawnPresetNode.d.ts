import { DynamoNode } from '../../service';
import { SpawnCondition } from '../../models';
import { ResourceLocation } from '../../models';
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
