export declare class NumberRange {
    min: number;
    max: number;
    constructor(min: number, max: number);
    static fromFlat(flatRange: number): NumberRange;
    serialize(): any;
    static deserialize(data: any): NumberRange;
}
