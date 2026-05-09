import { DynamoNode } from '../../service/dynamoNodes';
export declare const AbilityEntity = "Ability";
export declare class AbilityIdentifier {
    game: string;
    ability: string;
    constructor(game: string, ability: string);
    toString(): string;
    static fromString(identifier: string): AbilityIdentifier;
    getAbility(): string;
    serialize(): any;
    static deserialize(data: any): AbilityIdentifier;
}
export declare class AbilityNode extends DynamoNode {
    description?: string;
    rebalancedDescription?: string;
    identifier: AbilityIdentifier;
    implemented: boolean;
    constructor(name: AbilityIdentifier, description?: string, rebalancedDescription?: string, implemented?: boolean);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): DynamoNode;
}
export declare function createAbilityNode(name: AbilityIdentifier, description?: string, rebalancedDescription?: string): AbilityNode;
