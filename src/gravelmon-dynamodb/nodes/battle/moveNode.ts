import { DynamoNode } from '../../service';
import {MoveRange} from "../../models";
import { deserializerRegistry } from '../../service';
import { FieldEffectIdentifier } from "./fieldEffectNode";
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const MoveEntity = "Move";
export const MoveFlagEntity = "MoveFlag";


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

export class MoveFlagNode extends DynamoNode {
    moves: MoveIdentifier[]

    constructor(name: string, moves: MoveIdentifier[]) {
        super(MoveFlagEntity, name);
        this.moves = moves;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            flags: this.moves.map(m => m.serialize())
        }
    }

    public static deserialize(data: Record<string, any>): MoveFlagNode {
        return new MoveFlagNode(data.name, data.flags.map((m : any) => MoveIdentifier.deserialize(m)));
    }
}

export interface LearnedByData {
    levelUp: PokemonIdentifier[];
    teach: PokemonIdentifier[];
    egg: PokemonIdentifier[];
    legacy: PokemonIdentifier[];
    evolution: PokemonIdentifier[];
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
    associatedWeathers?: FieldEffectIdentifier[];
    associatedTerrain?: FieldEffectIdentifier[];
    associatedFieldEffects?: FieldEffectIdentifier[];
}

export function deserializeLearnedBy(data: any) {
    return {
        levelUp: data.levelUp.map(PokemonIdentifier.deserialize),
        teach: data.teach.map(PokemonIdentifier.deserialize),
        egg: data.egg.map(PokemonIdentifier.deserialize),
        legacy: data.legacy.map(PokemonIdentifier.deserialize),
        evolution: data.evolution.map(PokemonIdentifier.deserialize),
    }
}

export function serializeLearnedBy(data: LearnedByData) {
    return {
        levelUp: data.levelUp.map(p => p.serialize()),
        teach: data.teach.map(p => p.serialize()),
        egg: data.egg.map(p => p.serialize()),
        legacy: data.legacy.map(p => p.serialize()),
        evolution: data.evolution.map(p => p.serialize()),
    }
}

export class MoveNode extends DynamoNode {
    moveIdentifier: MoveIdentifier;
    displayName: string;
    moveData: MoveData;
    rebalancedMoveData?: MoveData;
    moveFlags: string[];
    implemented: boolean;
    itemRecipeCost: Record<string, number>
    learnedBy: LearnedByData;
    rebalancedLearnedBy: LearnedByData;

    constructor(displayName: string, name: MoveIdentifier,
                moveData: MoveData,
                learnedBy: LearnedByData,
                rebalancedMoveData?: MoveData,
                rebalancedLearnedBy?: LearnedByData,
                moveFlags: string[] = [], implemented: boolean = false, itemRecipeCost?: Record<string, number>) {
        super(MoveEntity, name.toString());
        this.displayName = displayName;
        this.moveIdentifier = name;
        this.moveData = moveData;
        this.rebalancedMoveData = rebalancedMoveData;
        this.moveFlags = moveFlags;
        this.implemented = implemented;
        this.itemRecipeCost = itemRecipeCost ?? {};
        this.learnedBy = learnedBy;
        this.rebalancedLearnedBy = rebalancedLearnedBy ?? {
            levelUp: [],
            teach: [],
            egg: [],
            legacy: [],
            evolution: [],
        };
    }

    static deserialize(data: Record<string, any>): MoveNode {
        return new MoveNode(
            data.displayName,
            MoveIdentifier.deserialize(data.moveIdentifier),
            MoveNode.deserializeMoveData(data.moveData),
            deserializeLearnedBy(data.learnedBy),
            data.rebalancedMoveData ? MoveNode.deserializeMoveData(data.rebalancedMoveData) : undefined,
            data.rebalancedLearnedBy ? deserializeLearnedBy(data.rebalancedLearnedBy) : undefined,
            data.moveFlags || [],
            data.implemented,
            data.itemRecipeCost
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
            learnedBy: serializeLearnedBy(this.learnedBy),
            rebalancedMoveData: this.rebalancedMoveData ? this.serializeMoveData(this.rebalancedMoveData) : undefined,
            rebalancedLearnedBy: serializeLearnedBy(this.rebalancedLearnedBy),
            moveFlags: this.moveFlags,
            implemented: this.implemented,
            itemRecipeCost: this.itemRecipeCost,
        }
    }
}

deserializerRegistry.register(MoveEntity, MoveNode.deserialize);
deserializerRegistry.register(MoveFlagEntity, MoveFlagNode.deserialize);