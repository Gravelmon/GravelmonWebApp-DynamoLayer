import { MoveIdentifier, MoveCategory } from '../../nodes/battle/moveNode';


export interface MoveSetEntry {
    moveName: MoveIdentifier;
    category: MoveCategory;
    basePower: number;
    accuracy: number;
    type: string;
    rebalancedBasePower?: number;
    rebalancedAccuracy?: number;
    rebalancedType?: string;
}

function serializeMoveSetEntry(entry: MoveSetEntry): any {
    return {
        moveName: entry.moveName.serialize(),
        category: entry.category,
        basePower: entry.basePower,
        accuracy: entry.accuracy,
        type: entry.type,
        rebalancedBasePower: entry.rebalancedBasePower,
        rebalancedAccuracy: entry.rebalancedAccuracy,
        rebalancedType: entry.rebalancedType
    }
}

function deserializeMoveSetEntry(data: any): MoveSetEntry {
    return {
        moveName: MoveIdentifier.deserialize(data.moveName),
        category: data.category,
        basePower: data.basePower,
        accuracy: data.accuracy,
        type: data.type,
        rebalancedBasePower: data.rebalancedBasePower,
        rebalancedAccuracy: data.rebalancedAccuracy,
        rebalancedType: data.rebalancedType
    }
}

export interface MoveSet {
    levelUpMoves: {
        moveName: MoveSetEntry;
        level: number;
    }[];
    teachMoves: MoveSetEntry[];
    eggMoves: MoveSetEntry[];
    legacyMoves: MoveSetEntry[];
}

export function serializeMoveSet(moveSet: MoveSet): any {
    return {
        levelUpMoves: moveSet.levelUpMoves.map(m => ({ moveName: serializeMoveSetEntry(m.moveName), level: m.level })),
        teachMoves: moveSet.teachMoves.map(serializeMoveSetEntry),
        eggMoves: moveSet.eggMoves.map(serializeMoveSetEntry),
        legacyMoves: moveSet.legacyMoves.map(serializeMoveSetEntry)
    }
}

export function deserializeMoveSet(data: any): MoveSet {
    return {
        levelUpMoves: data.levelUpMoves.map((m: any) => ({ moveName: deserializeMoveSetEntry(m.moveName), level: m.level })),
        teachMoves: data.teachMoves.map(deserializeMoveSetEntry),
        eggMoves: data.eggMoves.map(deserializeMoveSetEntry),
        legacyMoves: data.legacyMoves.map(deserializeMoveSetEntry)
    }
}
