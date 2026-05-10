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
export interface MoveSet {
    levelUpMoves: {
        moveName: MoveSetEntry;
        level: number;
    }[];
    teachMoves: MoveSetEntry[];
    eggMoves: MoveSetEntry[];
    legacyMoves: MoveSetEntry[];
}
export declare function serializeMoveSet(moveSet: MoveSet): any;
export declare function deserializeMoveSet(data: any): MoveSet;
