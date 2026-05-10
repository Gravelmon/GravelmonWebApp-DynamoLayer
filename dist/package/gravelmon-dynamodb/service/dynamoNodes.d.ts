export type PK = string;
export type SK = string | "METADATA";
export declare abstract class DynamoItem {
    PK: PK;
    SK: SK;
    entityType: string;
    version: number;
    lastEdited: number;
    constructor(pk: PK, sk: SK, entityType: string, version?: number, lastEdited?: number);
    serialize(): Record<string, any>;
}
export declare class DynamoNode extends DynamoItem {
    name: string;
    constructor(entityType: string, name: string, version?: number, lastEdited?: number);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare function getNodePK(type: string, name: string): PK;
export declare function getEdgeSK(edgeType: string, targetType: string, targetName: string): SK;
export declare function getPkType(pk: PK): string;
export declare function getPkName(pk: PK): string;
