import { PK } from "../../service/dynamoNodes";
import { NumberRange } from "../properties/numberRange";
import { Seat } from "./seat";
export declare enum RidingKey {
    Horse = "Horse",
    Vehicle = "Vehicle",
    Boat = "Boat",
    Submarine = "Submarine",
    Dolphin = "Dolphin",
    Bird = "Bird",
    Jet = "Jet",
    Hover = "Hover",
    Rocket = "Rocket",
    Burst = "Burst",
    Glider = "Glider",
    Minekart = "Minekart"
}
export type RidingStats = {
    ACCELERATION: NumberRange;
    JUMP: NumberRange;
    SKILL: NumberRange;
    SPEED: NumberRange;
    STAMINA: NumberRange;
};
export type RideSound = {
    muffleEnabled?: boolean;
    pitchExpression: string;
    playForNonPassengers?: boolean;
    playForPassengers?: boolean;
    SoundPK: PK;
    volumeExpression: string;
    submerged?: boolean;
};
export type RidingBehaviour = {
    key: RidingKey;
    stats: RidingStats;
    rideSounds: RideSound;
};
export interface RidingBehaviourOptions {
    airRidingBehaviour?: RidingBehaviour;
    landRidingBehaviour?: RidingBehaviour;
    liquidRidingBehaviour?: RidingBehaviour;
    seats: Seat[];
}
export declare function serializeRidingOptions(options: RidingBehaviourOptions): any;
export declare function deserializeRidingOptions(data: any): RidingBehaviourOptions;
