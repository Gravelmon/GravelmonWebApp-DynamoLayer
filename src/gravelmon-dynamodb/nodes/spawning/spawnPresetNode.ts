import { DynamoNode } from '../../service';
import { SpawnCondition } from '../../models';
import { ResourceLocation } from '../../models';
import { deserializerRegistry } from '../../service';

export const SpawnPresetEntity = "SpawnPreset";

export interface SpawnPresetOptions {
    name: ResourceLocation;
    condition?: SpawnCondition;
    antiCondition?: SpawnCondition;
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
        const options: SpawnPresetOptions = {
            name: ResourceLocation.deserialize(data.spawnPresetOptions.name),
            condition: data.spawnPresetOptions.condition ? SpawnCondition.deserialize(data.spawnPresetOptions.condition) : undefined,
            antiCondition: data.spawnPresetOptions.antiCondition ? SpawnCondition.deserialize(data.spawnPresetOptions.antiCondition) : undefined
        };

        return new SpawnPresetNode(options);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            spawnPresetOptions: {
                name: this.spawnPresetOptions.name.serialize(),
                condition: this.spawnPresetOptions.condition ? this.spawnPresetOptions.condition.serialize() : undefined,
                antiCondition: this.spawnPresetOptions.antiCondition ? this.spawnPresetOptions.antiCondition.serialize() : undefined
            }
        }
    }
}

deserializerRegistry.register(SpawnPresetEntity, SpawnPresetNode.deserialize);