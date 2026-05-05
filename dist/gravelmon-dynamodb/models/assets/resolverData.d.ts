export declare enum CommonLayerNames {
    Emissive = "emissive",
    TransparentEmissive = "transparentEmissive",
    Tail = "tail",
    Transparent_Emissive = "transparent_emissive",
    Emissive2 = "emissive2",
    Flame = "flame",
    Glow = "glow"
}
export interface ResolverLayer {
    name: string | CommonLayerNames;
    textureName: string;
    isEmissive?: boolean;
    isTranslucent?: boolean;
    framerate?: number;
    loops: boolean;
    numberOfFrames?: number;
}
export interface ResolverData {
    layers: ResolverLayer[];
    variationForAspectChoice?: {
        aspect: string;
        choice: string;
    };
}
export declare function serializeResolverData(resolverData: ResolverData): {
    layers: {
        name: string;
        textureName: string;
        isEmissive: boolean | undefined;
        isTranslucent: boolean | undefined;
        framerate: number | undefined;
        loops: boolean;
        numberOfFrames: number | undefined;
    }[];
    variationForAspectChoice: {
        aspect: string;
        choice: string;
    } | undefined;
};
export declare function deserializeResolverData(data: any): ResolverData;
