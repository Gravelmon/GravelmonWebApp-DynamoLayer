export declare class ResourceLocation {
    namespace: string;
    path: string;
    constructor(namespace: string, path: string);
    toString(): string;
    static fromString(location: string): ResourceLocation;
    serialize(): any;
    static deserialize(data: any): ResourceLocation;
}
