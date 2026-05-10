import { DynamoNode } from '../../service/dynamoNodes';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const LabelEntity = "Label";

export class LabelNode extends DynamoNode {
    pokemonInLabel: PokemonIdentifier[]
    static version = 1;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]) {
        super(LabelEntity, name);
        this.version = LabelNode.version;
        this.pokemonInLabel = pokemonIdentifiers;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            pokemonInLabel: this.pokemonInLabel.map(m => m.serialize())
        }
    }

    public static deserialize(data: Record<string, any>): LabelNode {
        return new LabelNode(data.name, data.flags.map((m : any) => PokemonIdentifier.deserialize(m)));
    }
}