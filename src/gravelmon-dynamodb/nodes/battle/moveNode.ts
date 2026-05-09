import { DynamoEdge, DynamoNode, getNodePK } from '../../service/dynamoNodes';
import { TypeEntity } from './typeNode';
import {MoveRange} from "../../models";
import { deserializerRegistry } from '../../service';
import {FieldEffectEntity, FieldEffectIdentifier} from "./fieldEffectNode";

export const MoveEntity = "Move";
export const MoveFlagEntity = "MoveFlag";

export const enum MoveEdgeType {
    IsType = "IsType",
    WithFlag = "WithFlag",
    AssociatedWithFieldEffect = "AssociatedWithFieldEffect"
}

export enum MoveCategory {
    Physical = "Physical",
    Special = "Special",
    Status = "Status"
}

export class MoveIdentifier {
    game: string;
    move: string;
    constructor(game: string, pokemon: string) {
        this.game = game;
        this.move = pokemon;
    }

    toString(): string {
        return `${this.game}#${this.move}`;
    }

    static fromString(identifier: string): MoveIdentifier {
        const [game, move] = identifier.split("#");
        return new MoveIdentifier(game, move);
    }

    getMove(): string {
        return this.move;
    }

    serialize(): any {
        return {
            game: this.game,
            move: this.move
        };
    }

    static deserialize(data: any): MoveIdentifier {
        return new MoveIdentifier(data.game, data.move);
    }
}

export function createMoveFlagNode(name: string): DynamoNode {
    return new DynamoNode(MoveFlagEntity, name);
}

export function createMoveIsTypeEdge(moveName: MoveIdentifier, typeName: string): DynamoEdge {
    return new DynamoEdge(getNodePK(TypeEntity, typeName), MoveEdgeType.IsType, MoveEntity, moveName.toString());
}

export function createMoveWithFlagEdge(moveName: MoveIdentifier, flagName: string): DynamoEdge {
    return new DynamoEdge(getNodePK(MoveFlagEntity, flagName), MoveEdgeType.WithFlag, MoveEntity, moveName.toString());
}

export function createMoveAssociatedWithFieldEffectEdge(moveName: MoveIdentifier, fieldEffect: FieldEffectIdentifier): DynamoEdge {
    return new DynamoEdge(getNodePK(FieldEffectEntity, fieldEffect.toString()), MoveEdgeType.AssociatedWithFieldEffect, MoveEntity, moveName.toString());
}

export interface MoveData {
    moveTypes: string[];
    powerPoints: number;
    basePower: number;
    priority: number;
    accuracy: number;
    moveRange: MoveRange;
    moveCategory: MoveCategory;
    description?: string;
    zMoveEffect?: string;
    //string used here must be a resource location
    itemRecipeCost: Record<string, number>
    associatedWeathers?: FieldEffectIdentifier[];
    associatedTerrain?: FieldEffectIdentifier[];
    associatedFieldEffects?: FieldEffectIdentifier[];
}

export class MoveNode extends DynamoNode {
    moveIdentifier: MoveIdentifier;
    displayName: string;
    moveData: MoveData;
    rebalancedMoveData?: MoveData;
    moveFlags: string[];
    implemented: boolean;

    constructor(displayName: string, name: MoveIdentifier,
                moveData: MoveData,
                rebalancedMoveData?: MoveData,
                moveFlags: string[] = [], implemented: boolean = false) {
        super(MoveEntity, name.toString());
        this.displayName = displayName;
        this.moveIdentifier = name;
        this.moveData = moveData;
        this.rebalancedMoveData = rebalancedMoveData;
        this.moveFlags = moveFlags;
        this.implemented = implemented;
    }

    static deserialize(data: Record<string, any>): MoveNode {
        return new MoveNode(
            data.displayName,
            MoveIdentifier.deserialize(data.moveIdentifier),
            MoveNode.deserializeMoveData(data.moveData),
            data.rebalancedMoveData ? MoveNode.deserializeMoveData(data.rebalancedMoveData) : undefined,
            data.moveFlags || [],
            data.implemented
        );
    }

    static deserializeMoveData(data: any): MoveData {
        return {
            moveTypes: data.moveTypes,
            powerPoints: data.powerPoints,
            basePower: data.basePower,
            priority: data.priority,
            accuracy: data.accuracy,
            moveRange: data.moveRange,
            moveCategory: data.moveCategory,
            description: data.description,
            zMoveEffect: data.zMoveEffect,
            itemRecipeCost: data.itemRecipeCost,
            associatedWeathers: data.associatedWeathers,
            associatedTerrain: data.associatedTerrain,
            associatedFieldEffects: data.associatedFieldEffects
        }
    }

    private serializeMoveData(moveData: MoveData): any {
        return {
            moveTypes: moveData.moveTypes,
            powerPoints: moveData.powerPoints,
            basePower: moveData.basePower,
            priority: moveData.priority,
            accuracy: moveData.accuracy,
            moveRange: moveData.moveRange,
            moveCategory: moveData.moveCategory,
            description: moveData.description,
            zMoveEffect: moveData.zMoveEffect,
            itemRecipeCost: moveData.itemRecipeCost,
            associatedWeathers: moveData.associatedWeathers,
            associatedTerrain: moveData.associatedTerrain,
            associatedFieldEffects: moveData.associatedFieldEffects
        }
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            displayName: this.displayName,
            moveIdentifier: this.moveIdentifier.serialize(),
            moveData: this.serializeMoveData(this.moveData),
            rebalancedMoveData: this.rebalancedMoveData ? this.serializeMoveData(this.rebalancedMoveData) : undefined,
            moveFlags: this.moveFlags,
            implemented: this.implemented
        }
    }
}

deserializerRegistry.register(MoveEntity, MoveNode.deserialize);