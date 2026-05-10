import { deserializerRegistry } from '../../service/deserializerRegistry';
import { DynamoNode } from '../../service/dynamoNodes';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const AbilityEntity = "Ability";

export class AbilityIdentifier {
    game: string;
    ability: string;

    constructor(game: string, ability: string) {
        this.game = game;
        this.ability = ability;
    }

    toString(): string {
        return `${this.game}#${this.ability}`;
    }

    static fromString(identifier: string): AbilityIdentifier {
        const [game, ability] = identifier.split("#");
        return new AbilityIdentifier(game, ability);
    }

    getAbility(): string {
        return this.ability;
    }

    serialize(): any {
        return {
            game: this.game,
            ability: this.ability
        };
    }

    static deserialize(data: any): AbilityIdentifier {
        return new AbilityIdentifier(data.game, data.ability);
    }
}

export class AbilityNode extends DynamoNode {
    description?: string;
    rebalancedDescription?: string;
    identifier: AbilityIdentifier;
    implemented: boolean = false;
    abilityHolders: PokemonIdentifier[];
    rebalancedAbilityHolders: PokemonIdentifier[];

    constructor(name: AbilityIdentifier,
                abilityHolder : PokemonIdentifier[],
                rebalancedAbilityHolders: PokemonIdentifier[],
                description?: string,
                rebalancedDescription?: string,
                implemented: boolean = false) {
        super(AbilityEntity, name.toString());
        this.description = description;
        this.identifier = name;
        this.rebalancedDescription = rebalancedDescription;
        this.implemented = implemented;
        this.abilityHolders = abilityHolder;
        this.rebalancedAbilityHolders = rebalancedAbilityHolders;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            description: this.description,
            rebalancedDescription: this.rebalancedDescription,
            identifier: this.identifier.serialize(),
            implemented: this.implemented,
            abilityHolders: this.abilityHolders.map((pokemon)=>pokemon.serialize()),
            rebalancedAbilityHolders: this.rebalancedAbilityHolders.map((pokemon)=>pokemon.serialize())
        }
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        const abilityHolders = data.abilityHolders ? data.abilityHolders.map((pokemon: any)=>PokemonIdentifier.deserialize(pokemon)) : [];
        const rebalancedAbilityHolders = data.rebalancedAbilityHolders ? data.rebalancedAbilityHolders.map((pokemon: any)=>PokemonIdentifier.deserialize(pokemon)) : [];
        return new AbilityNode(AbilityIdentifier.deserialize(data.identifier), abilityHolders, rebalancedAbilityHolders, data.description, data.rebalancedDescription, data.implemented);
    }
}

deserializerRegistry.register(AbilityEntity, AbilityNode.deserialize);