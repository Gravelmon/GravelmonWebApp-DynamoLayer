import { DynamoNode } from '../../service/dynamoNodes';
export declare const SpeciesFeatureEntity = "SpeciesFeature";
export declare const HasSpeciesFeatureEdgeType = "HasSpeciesFeature";
export declare enum SpeciesFeatureType {
    Flag = 0,
    Choice = 1
}
export declare function createFlagSpeciesFeatureNode(id: string, speciesFeatureName: string, defaultValue: boolean | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number): SpeciesFeatureNode;
export declare function createChoiceSpeciesFeatureNode(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number): SpeciesFeatureNode;
declare abstract class SpeciesFeatureNode extends DynamoNode {
    speciesFeatureName: string;
    speciesFeatureType: SpeciesFeatureType;
    isSpeciesFeature: boolean;
    defaultOption?: boolean | "random" | string;
    /** Indicates that this speciesFeature governs the form of the pokemon (e.g. Galarian vs Hisuian)
    non primary speciesFeatures include female form, gigantamax form, mega form etc. It is possible for a pokemon to have multiple primary speciesFeatures*/
    isPrimarySpeciesFeature: boolean;
    introducedByGame: string;
    static version: number;
    protected constructor(id: string, speciesFeatureName: string, speciesFeatureType: SpeciesFeatureType, defaultValue: boolean | "random" | string, isPrimarySpeciesFeature: boolean, introducedByGame: string, lastEdited?: number);
    static deserialize(data: Record<string, any>): SpeciesFeatureNode;
    serialize(): Record<string, any>;
}
export declare class FlagSpeciesFeatureNode extends SpeciesFeatureNode {
    constructor(id: string, speciesFeatureName: string, defaultValue: boolean | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number);
}
export declare class ChoiceSpeciesFeatureNode extends SpeciesFeatureNode {
    choices: string[];
    constructor(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number);
    serialize(): Record<string, any>;
}
export {};
