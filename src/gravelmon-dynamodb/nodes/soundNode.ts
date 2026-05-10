import { SoundData } from '../models/soundData';
import { deserializerRegistry } from '../service/deserializerRegistry';
import { DynamoNode } from '../service/dynamoNodes';
import { PokemonIdentifier } from './pokemon/pokemonNode';

export const SoundEntity = "Sound";

export class SoundNode extends DynamoNode {
    soundData: SoundData;
    usedBy: PokemonIdentifier[] = [];
    static version = 1;
    constructor(soundData: SoundData, usedBy: PokemonIdentifier[], lastEdited: number = Date.now()) {
        super(SoundEntity, soundData.name, SoundNode.version, lastEdited);
        this.soundData = soundData;
        this.usedBy = usedBy;
    }

    static deserialize(data: Record<string, any>): SoundNode {
        const soundData: SoundData = {
            name: data.soundData.name,
            s3Location: data.soundData.s3Location,
            madeBy: data.soundData.madeBy
        };
        return new SoundNode(soundData,
            data.usedBy.map((m : any) => PokemonIdentifier.deserialize(m)),
            data.lastEdited);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            soundData: {
                name: this.soundData.name,
                s3Location: this.soundData.s3Location,
                madeBy: this.soundData.madeBy
            },
            usedBy: this.usedBy.map(m => m.serialize())
        }
    }
}

deserializerRegistry.register(SoundEntity, SoundNode.deserialize);