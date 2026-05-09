import { deserializerRegistry } from '../../service/deserializerRegistry';
import { DynamoNode } from '../../service/dynamoNodes';

export const TypeEntity = "Type";

export function createTypeNode(name: string, typeInteractions: TypeInteractions, rebalancedTypeInteractions?: TypeInteractions, introducedByGames?: string[]): TypeNode {
    return new TypeNode(name, typeInteractions, rebalancedTypeInteractions, introducedByGames);
}

export interface TypeInteractions {
    resists: string[];
    immunities: string[];
    weaknesses: string[];
    secondaryEffect?: string;
}

export class TypeNode extends DynamoNode {
    private introducedByGames?: string[];
    private typeInteractions: TypeInteractions;
    private rebalancedTypeInteractions: TypeInteractions;

    constructor(name: string, typeInteractions: TypeInteractions, rebalancedTypeInteractions?: TypeInteractions, introducedByGames?: string[]) {
        super(TypeEntity, name);
        this.introducedByGames = introducedByGames;
        this.typeInteractions = typeInteractions;
        this.rebalancedTypeInteractions = rebalancedTypeInteractions ?? typeInteractions;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            typeInteractions: this.typeInteractions,
            rebalancedTypeInteractions: this.rebalancedTypeInteractions,
            introducedByGames: this.introducedByGames,
        }
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        const typeNode = new TypeNode(data.name, data.typeInteractions, data.rebalancedTypeInteractions, data.introducedByGames);
        return typeNode;
    }
}

deserializerRegistry.register(TypeEntity, TypeNode.deserialize);