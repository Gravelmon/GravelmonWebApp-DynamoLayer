import { deserializerRegistry } from '../../service/deserializerRegistry';
import { DynamoNode } from '../../service/dynamoNodes';

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

    constructor(name: AbilityIdentifier, description?: string, rebalancedDescription?: string, implemented: boolean = false) {
        super(AbilityEntity, name.toString());
        this.description = description;
        this.identifier = name;
        this.rebalancedDescription = rebalancedDescription;
        this.implemented = implemented;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            description: this.description,
            rebalancedDescription: this.rebalancedDescription,
            identifier: this.identifier.serialize(),
            implemented: this.implemented
        }
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        return new AbilityNode(AbilityIdentifier.deserialize(data.identifier), data.description, data.rebalancedDescription, data.implemented);
    }
}

export function createAbilityNode(name: AbilityIdentifier, description?: string, rebalancedDescription?: string): AbilityNode {
    return new AbilityNode(name, description, rebalancedDescription);
}

deserializerRegistry.register(AbilityEntity, AbilityNode.deserialize);