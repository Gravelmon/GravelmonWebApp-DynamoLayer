import { DynamoNode } from '../../service/dynamoNodes';
export declare const AspectEntity = "Aspect";
export declare const HasAspectEdgeType = "HasAspect";
export declare enum AspectType {
    Flag = 0,
    Choice = 1
}
export declare function createFlagAspectNode(name: string, defaultValue: boolean | undefined, isPrimaryAspect: boolean | undefined, introducedByGame: string, lastEdited?: number): AspectNode;
export declare function createChoiceAspectNode(name: string, choices: string[], defaultValue: string | "random" | undefined, isPrimaryAspect: boolean | undefined, introducedByGame: string, lastEdited?: number): AspectNode;
declare abstract class AspectNode extends DynamoNode {
    aspectType: AspectType;
    isAspect: boolean;
    defaultOption?: boolean | "random" | string;
    /** Indicates that this aspect governs the form of the pokemon (e.g. Galarian vs Hisuian)
    non primary aspects include female form, gigantamax form, mega form etc. It is possible for a pokemon to have multiple primary aspects*/
    isPrimaryAspect: boolean;
    introducedByGame: string;
    static version: number;
    protected constructor(name: string, aspectType: AspectType, defaultValue: boolean | "random" | string, isPrimaryAspect: boolean, introducedByGame: string, lastEdited?: number);
    static deserialize(data: Record<string, any>): AspectNode;
    serialize(): Record<string, any>;
}
export declare class FlagAspectNode extends AspectNode {
    constructor(name: string, defaultValue: boolean | undefined, isPrimaryAspect: boolean | undefined, introducedByGame: string, lastEdited?: number);
}
export declare class ChoiceAspectNode extends AspectNode {
    choices: string[];
    constructor(name: string, choices: string[], defaultValue: string | "random" | undefined, isPrimaryAspect: boolean | undefined, introducedByGame: string, lastEdited?: number);
    static deserialize(data: Record<string, any>): ChoiceAspectNode;
    serialize(): Record<string, any>;
}
export {};
