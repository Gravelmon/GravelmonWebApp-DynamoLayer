import {deserializerRegistry} from '../../service/deserializerRegistry';
import {DynamoNode} from '../../service/dynamoNodes';
import {MoveIdentifier} from "./moveNode";
import {FieldEffectIdentifier} from "./fieldEffectNode";
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const TypeEntity = "Type";

export interface TypeInteractions {
    resists: string[];
    immunities: string[];
    weaknesses: string[];
    secondaryEffect?: string;

}

export class TypeNode extends DynamoNode {
    introducedByGames: string[];
    typeInteractions: TypeInteractions;
    rebalancedTypeInteractions: TypeInteractions;
    moves: MoveIdentifier[];
    associatedFieldEffects: FieldEffectIdentifier[];
    pokemon: PokemonIdentifier[]

    constructor(name: string, typeInteractions: TypeInteractions, introducedByGames: string[],
                moves: MoveIdentifier[], associatedFieldEffects: FieldEffectIdentifier[], pokemon: PokemonIdentifier[], rebalancedTypeInteractions?: TypeInteractions) {
        super(TypeEntity, name);
        this.introducedByGames = introducedByGames;
        this.typeInteractions = typeInteractions;
        this.rebalancedTypeInteractions = rebalancedTypeInteractions ?? typeInteractions;
        this.moves = moves;
        this.associatedFieldEffects = associatedFieldEffects;
        this.pokemon = pokemon;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            typeInteractions: this.typeInteractions,
            rebalancedTypeInteractions: this.rebalancedTypeInteractions,
            introducedByGames: this.introducedByGames,
            moves: this.moves.map((move)=>move.serialize()),
            associatedFieldEffects: this.associatedFieldEffects.map((fieldEffect)=>fieldEffect.serialize()),
            pokemon: this.pokemon.map((pokemon)=>pokemon.serialize())
        }
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        const pokemon = data.pokemon ? data.pokemon.map((pokemon: any)=>PokemonIdentifier.deserialize(pokemon)) : [];
        const moves = data.moves ? data.moves.map((move: any)=>MoveIdentifier.deserialize(move)) : [];
        const associatedFieldEffects = data.associatedFieldEffects ? data.associatedFieldEffects.map((fieldEffect: any)=>FieldEffectIdentifier.deserialize(fieldEffect)) : [];

        return new TypeNode(data.name, data.typeInteractions, data.introducedByGames, moves, associatedFieldEffects, pokemon, data.rebalancedTypeInteractions);
    }
}

deserializerRegistry.register(TypeEntity, TypeNode.deserialize);