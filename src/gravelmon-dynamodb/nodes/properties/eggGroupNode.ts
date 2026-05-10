import { DynamoNode } from '../../service';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const EggGroupEntity = "EggGroup";
export const InEggGroupEdgeType = "InEggGroup";

export class EggGroupNode extends DynamoNode {
    pokemonInEggGroup: PokemonIdentifier[]
    static version = 1;
    constructor(name: string, pokemonIdentifiers: PokemonIdentifier[]) {
        super(EggGroupEntity, name);
        this.version = EggGroupNode.version;
        this.pokemonInEggGroup = pokemonIdentifiers;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            pokemonInEggGroup: this.pokemonInEggGroup.map(m => m.serialize())
        }
    }

    public static deserialize(data: Record<string, any>): EggGroupNode {
        return new EggGroupNode(data.name, data.flags.map((m : any) => PokemonIdentifier.deserialize(m)));
    }
}
