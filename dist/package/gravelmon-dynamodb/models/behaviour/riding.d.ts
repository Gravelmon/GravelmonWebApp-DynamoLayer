import { PK } from "../../service/dynamoNodes";
import { NumberRange } from "../properties/numberRange";
import { Seat } from "./seat";
export declare enum RidingKey {
    Horse = 0,
    Vehicle = 1,
    Boat = 2,
    Submarine = 3,
    Dolphin = 4,
    Bird = 5,
    Jet = 6,
    Hover = 7,
    Rocket = 8,
    Burst = 9,
    Glider = 10,
    Minekart = 11
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
export declare function serializeRidingBehaviourOptions(options: RidingBehaviourOptions): any;
export declare function deserializeRidingBehaviourOptions(data: any): RidingBehaviourOptions;
