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
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}

export class FieldEffectNode extends DynamoNode {
    displayName: string;
    identifier: FieldEffectIdentifier;
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectFlags: string[];
    introducedByGames: string[];
    implemented: boolean
    constructor(displayName: string, identifier: FieldEffectIdentifier, fieldEffectData: FieldEffectData,
                rebalancedFieldEffectData?: FieldEffectData, introducedByGames?: string[],
                fieldEffectFlags: string[] = [], implemented: boolean = false) {
        super(FieldEffectEntity, identifier.toString());
        this.displayName = displayName;
        this.identifier = identifier;
        this.fieldEffectData = fieldEffectData;
        this.rebalancedFieldEffectData = rebalancedFieldEffectData;
        this.introducedByGames = introducedByGames ?? [];
        this.fieldEffectFlags = fieldEffectFlags;
        this.implemented = implemented;
    }

    static deserialize(data: Record<string, any>): FieldEffectNode {
        const fieldEffectData = FieldEffectNode.deserializeFieldEffectData(data.fieldEffectData);
        return new FieldEffectNode(
            data.displayName,
            FieldEffectIdentifier.deserialize(data.identifier),
            fieldEffectData,
            data.rebalancedFieldEffectData ? FieldEffectNode.deserializeFieldEffectData(data.rebalancedFieldEffectData) : undefined,
            data.fieldEffectFlags || [],
            data.implemented
        );
    }

    static deserializeFieldEffectData(data: any): FieldEffectData {
        return {
            associatedTypes: data.associatedTypes,
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    private serializeFieldEffectData(data: FieldEffectData): any {
        return {
            associatedTypes: data.associatedTypes,
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            displayName: this.displayName,
            identifier: this.identifier.serialize(),
            fieldEffectData: this.serializeFieldEffectData(this.fieldEffectData),
            rebalancedFieldEffectData: this.rebalancedFieldEffectData ? this.serializeFieldEffectData(this.rebalancedFieldEffectData) : undefined,
            introducedByGames: this.introducedByGames,
            fieldEffectFlags: this.fieldEffectFlags,
            implemented: this.implemented
        }
    }
}

deserializerRegistry.register(FieldEffectEntity, FieldEffectNode.deserialize);