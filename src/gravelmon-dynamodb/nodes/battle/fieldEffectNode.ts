import { DynamoEdge, DynamoNode, getNodePK } from '../../service/dynamoNodes';
import { TypeEntity } from './typeNode';
import { deserializerRegistry } from '../../service/deserializerRegistry';
import {MoveRange} from "../../models/battle/moveRange";

export const FieldEffectEntity = "FieldEffect";
export const FieldEffectFlagEntity = "FieldEffectFlag";

export const enum FieldEffectEdgeType {
    IsType = "IsType",
    WithFlag = "WithFlag"
}

export class FieldEffectIdentifier {
    game: string;
    fieldEffect: string;
    constructor(game: string, pokemon: string) {
        this.game = game;
        this.fieldEffect = pokemon;
    }

    toString(): string {
        return `${this.game}#${this.fieldEffect}`;
    }

    static fromString(identifier: string): FieldEffectIdentifier {
        const [game, fieldEffect] = identifier.split("#");
        return new FieldEffectIdentifier(game, fieldEffect);
    }

    getFieldEffect(): string {
        return this.fieldEffect;
    }

    serialize(): any {
        return {
            game: this.game,
            fieldEffect: this.fieldEffect
        };
    }

    static deserialize(data: any): FieldEffectIdentifier {
        return new FieldEffectIdentifier(data.game, data.fieldEffect);
    }
}

export function createFieldEffectFlagNode(name: string): DynamoNode {
    return new DynamoNode(FieldEffectFlagEntity, name);
}

export function createFieldEffectIsTypeEdge(fieldEffectName: FieldEffectIdentifier, typeName: string): DynamoEdge {
    return new DynamoEdge(getNodePK(TypeEntity, typeName), FieldEffectEdgeType.IsType, FieldEffectEntity, fieldEffectName.toString());
}

export function createFieldEffectWithFlagEdge(fieldEffectName: FieldEffectIdentifier, flagName: string): DynamoEdge {
    return new DynamoEdge(getNodePK(FieldEffectFlagEntity, flagName), FieldEffectEdgeType.WithFlag, FieldEffectEntity, fieldEffectName.toString());
}

export interface FieldEffectData {
    associatedTypes?: string[];
    identifier: FieldEffectIdentifier;
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}

export class FieldEffectNode extends DynamoNode {
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectFlags: string[];

    constructor(fieldEffectData: FieldEffectData,
                rebalancedFieldEffectData?: FieldEffectData,
                fieldEffectFlags: string[] = []) {
        super(FieldEffectEntity, fieldEffectData.identifier.toString());
        this.fieldEffectData = fieldEffectData;
        this.rebalancedFieldEffectData = rebalancedFieldEffectData;
        this.fieldEffectFlags = fieldEffectFlags;
    }

    static deserialize(data: Record<string, any>): FieldEffectNode {
        const fieldEffectData = FieldEffectNode.deserializeFieldEffectData(data.fieldEffectData);
        return new FieldEffectNode(
            fieldEffectData,
            data.rebalancedFieldEffectData ? FieldEffectNode.deserializeFieldEffectData(data.rebalancedFieldEffectData) : undefined,
            data.fieldEffectFlags || []
        );
    }

    static deserializeFieldEffectData(data: any): FieldEffectData {
        return {
            identifier: FieldEffectIdentifier.deserialize(data.identifier),
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    private serializeFieldEffectData(data: FieldEffectData): any {
        return {
            identifier: data.identifier.serialize(),
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            fieldEffectData: this.serializeFieldEffectData(this.fieldEffectData),
            rebalancedFieldEffectData: this.rebalancedFieldEffectData ? this.serializeFieldEffectData(this.rebalancedFieldEffectData) : undefined,
            fieldEffectFlags: this.fieldEffectFlags
        }
    }
}

deserializerRegistry.register(FieldEffectEntity, FieldEffectNode.deserialize);