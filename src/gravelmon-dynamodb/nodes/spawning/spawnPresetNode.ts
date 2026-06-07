import { DynamoNode } from '../../service';
import {deserializeSpawnCondition, serializeSpawnCondition, SpawnCondition} from '../../models';
import { ResourceLocation } from '../../models';
import { deserializerRegistry } from '../../service';

export const SpawnPresetEntity = "SpawnPreset";

export interface SpawnPresetOptions {
    name: ResourceLocation;
    condition?: SpawnCondition;
    antiCondition?: SpawnCondition;
}

export function deserializeSpawnPresetOptions(spawnPresetOptions: any) {
    return {
        name: ResourceLocation.deserialize(spawnPresetOptions.name),
        condition: spawnPresetOptions.condition ? deserializeSpawnCondition(spawnPresetOptions.condition) : undefined,
        antiCondition: spawnPresetOptions.antiCondition ? deserializeSpawnCondition(spawnPresetOptions.antiCondition) : undefined
    };
}

export class SpawnPresetNode extends DynamoNode {
    spawnPresetOptions: SpawnPresetOptions;
    static version = 1;

    constructor(spawnPresetOptions: SpawnPresetOptions, lastEdited: number = Date.now()) {
        super(SpawnPresetEntity, spawnPresetOptions.name.toString(), SpawnPresetNode.version, lastEdited);
        this.spawnPresetOptions = spawnPresetOptions;
    }

    static deserialize(data: Record<string, any>): SpawnPresetNode {
        if(!data.spawnPresetOptions || !data.spawnPresetOptions.name) {
            throw new Error("Invalid data for deserializing SpawnPresetNode: missing spawnPresetOptions or name");
        }
        const options: SpawnPresetOptions = deserializeSpawnPresetOptions(data.spawnPresetOptions);

        return new SpawnPresetNode(options);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            spawnPresetOptions: {
                name: this.spawnPresetOptions.name.serialize(),
                condition: this.spawnPresetOptions.condition ?  serializeSpawnCondition(this.spawnPresetOptions.condition) : undefined,
                antiCondition: this.spawnPresetOptions.antiCondition ? serializeSpawnCondition(this.spawnPresetOptions.antiCondition) : undefined
            }
        }
    }
}

deserializerRegistry.register(SpawnPresetEntity, SpawnPresetNode.deserialize);