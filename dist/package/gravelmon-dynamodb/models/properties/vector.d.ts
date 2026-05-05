export type Vector = {
    x: number;
    y: number;
    z: number;
};
export declare function serializeVector(vector: Vector): Record<string, any>;
export declare function deserializeVector(data: any): Vector;
