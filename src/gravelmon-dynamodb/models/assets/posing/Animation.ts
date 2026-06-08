import {deserializeExpression, ExpressionNode, serializeExpression} from "./ConditionTree";
import {PoseType} from "./poseType";
import {MoveIdentifier} from "../../../nodes";
import {NumberRange} from "../../properties";

export function serializeAnimation(anim: Animation): any {
    const base = {
        type: anim.type,
        animationSource: anim.animationSource,
        animationOverwriteString: anim.animationOverwriteString,
        animation: anim.animation,
        conditionExpression: anim.conditionExpression
            ? serializeExpression(anim.conditionExpression)
            : undefined,
    };

    if (isLookAnimation(anim)) {
        return {
            ...base,
            pitchMultiplier: anim.pitchMultiplier,
            yawMultiplier: anim.yawMultiplier,
            pitchRange: anim.pitchRange ? anim.pitchRange.serialize() : undefined,
            yawRange: anim.yawRange ? anim.yawRange.serialize() : undefined
        };
    }

    if (isNamedAnimation(anim)) {
        return {
            ...base,
            name: anim.name,
            primarySettings: anim.primarySettings,
        };
    }

    if (isQuirkAnimation(anim)) {
        return {
            ...base,
            loopTimes: anim.loopTimes,
            occurrenceRange: anim.occurrenceRange,
            primarySettings: anim.primarySettings,
        };
    }

    return base;
}

export type AnyAnimation =
    | Animation
    | LookAnimation
    | NamedAnimation
    | QuirkAnimation;

export function deserializeAnimation(data: any): AnyAnimation {
    if (!data?.type) {
        throw new Error("Invalid animation: missing type");
    }

    const base = {
        type: data.type,
        animationSource: data.animationSource,
        animationOverwriteString: data.animationOverwriteString,
        animation: data.animation ?? [],
        conditionExpression: data.conditionExpression
            ? deserializeExpression(data.conditionExpression)
            : undefined,
    };

    switch (data.type) {
        case AnimationTypes.Look:
            return {
                ...base,
                pitchMultiplier: data.pitchMultiplier,
                yawMultiplier: data.yawMultiplier,
                pitchRange: data.pitchRange ? NumberRange.deserialize(data.pitchRange) : undefined,
                yawRange: data.yawRange ? NumberRange.deserialize(data.yawRange) : undefined,
            } satisfies LookAnimation;

        case AnimationTypes.Named:
            return {
                ...base,
                name: data.name,
                primarySettings: data.primarySettings,
            } satisfies NamedAnimation;

        case AnimationTypes.Quirk:
            return {
                ...base,
                loopTimes: data.loopTimes,
                occurrenceRange: data.occurrenceRange,
                primarySettings: data.primarySettings,
            } satisfies QuirkAnimation;

        case AnimationTypes.Animation:
            return {
                ...base,
            }

        default:
            throw new Error(`Unknown AnimationTypes: ${data.type}`);
    }
}

function isLookAnimation(a: Animation): a is LookAnimation {
    return a.type === AnimationTypes.Look;
}

function isNamedAnimation(a: Animation): a is NamedAnimation {
    return a.type === AnimationTypes.Named;
}

function isQuirkAnimation(a: Animation): a is QuirkAnimation {
    return a.type === AnimationTypes.Quirk;
}

export enum NamedAnimationTypes {
    Cry = "cry",
    Recoil = "recoil",
    Status = "status",
    Special = "special",
    Physical = "Physical",
    Faint = "faint",
    AirSpecial = "air_special",
    AirPhysical = "air_physical",
    AirStatus = "air_status",
}

export enum RidingStyle {
    LAND = "Land",
    LIQUID = "Liquid",
    AIR = "Air"
}

export interface PrimarySettings {
    curve: "one" | "symmetric" | "symmetrical_wide";
    //"Exclusive labeled animations that wont get overwritten by this primary animation.
    // The only reasonable use of excluded labels is to exclude the look animation from being overwritten.
    // This is so they can keep looking at a target when using an animation."
    excludedLabels?: string[];
}

export enum AnimationTypes {
    Look = "Look",
    Named = "Named",
    Quirk = "Quirk",
    Animation = "Animation",
}

//will generally use q.bedrock()
export interface Animation {
    type: AnimationTypes;
    //'blastoise' for "q.bedrock('blastoise', 'ground_walk')", or the bone for a look animation
    animationSource: string;
    //string array to support the use of q.array()
    animationOverwriteString?: string //for custom animation strings, eg the math.random chains sometimes found in animations
    animation: string[]; //'ground_walk' for "q.bedrock('blastoise', 'ground_walk')"
    conditionExpression?: ExpressionNode; //eg "q.is_standing_on_blocks(2, 'minecraft:sand', 'minecraft:red_sand')"
}

//"q.look('head_ai', 1, 1, 70, -45, 45, -45)"
export interface LookAnimation extends Animation {
    pitchMultiplier?: number;
    yawMultiplier?: number;
    pitchRange?: NumberRange;
    yawRange?: NumberRange;
}

//should generally use the q.bedrock_stateful() method, but can also use the q.bedrock_primary
export interface NamedAnimation extends Animation {
    name: NamedAnimationTypes | MoveIdentifier | PoseType | string;
    primarySettings?: PrimarySettings;
}


//should generally use the q.bedrock_quirk() method, but can also use the q.bedrock_primary_quirk
export interface QuirkAnimation extends Animation {
    loopTimes?: number;
    occurrenceRange?: NumberRange;
    primarySettings?: PrimarySettings;
}