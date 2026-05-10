import { DynamoNode } from '../../service/dynamoNodes';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const ExperienceGroupEntity = "ExperienceGroup";

export class ExperienceGroupNode extends DynamoNode {
    pokemonInExperienceGroup: PokemonIdentifier[]
    static version = 1;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]) {
        super(ExperienceGroupEntity, name);
        this.version = ExperienceGroupNode.version;
        this.pokemonInExperienceGroup = pokemonIdentifiers;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            pokemonInExperienceGroup: this.pokemonInExperienceGroup.map(m => m.serialize())
        }
    }

    public static deserialize(data: Record<string, any>): ExperienceGroupNode {
        return new ExperienceGroupNode(data.name, data.flags.map((m : any) => PokemonIdentifier.deserialize(m)));
    }
}