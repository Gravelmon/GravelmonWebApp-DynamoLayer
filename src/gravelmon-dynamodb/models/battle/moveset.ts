import { MoveIdentifier, MoveCategory } from '../../nodes';


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
        rebalancedBasePower: entry.rebalancedBasePower ?? undefined,
        rebalancedAccuracy: entry.rebalancedAccuracy ?? undefined,
        rebalancedType: entry.rebalancedType ?? undefined
    }
}

function deserializeMoveSetEntry(data: any): MoveSetEntry {
    return {
        moveName: MoveIdentifier.deserialize(data.moveName),
        category: data.category ?? MoveCategory.UNKNOWN,
        basePower: data.basePower ?? 0,
        accuracy: data.accuracy ?? 100,
        type: data.type,
        rebalancedBasePower: data.rebalancedBasePower ?? undefined,
        rebalancedAccuracy: data.rebalancedAccuracy ?? undefined,
        rebalancedType: data.rebalancedType ?? undefined
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
        levelUpMoves: data.levelUpMoves ? data.levelUpMoves.map((m: any) => ({ moveName: deserializeMoveSetEntry(m.moveName), level: m.level })) : [],
        teachMoves: data.teachMoves ? data.teachMoves.map(deserializeMoveSetEntry) : [],
        eggMoves: data.eggMoves ? data.eggMoves.map(deserializeMoveSetEntry) : [],
        legacyMoves: data.legacyMoves ? data.legacyMoves.map(deserializeMoveSetEntry) : []
    }
}
