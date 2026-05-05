import { NumberRange } from "./numberRange";
export declare enum Time {
    Day = "day",
    Night = "night",
    Dawn = "dawn",
    Dusk = "dusk"
}
export type TimeRange = {
    type: "time";
    value: Time;
} | {
    type: "range";
    value: NumberRange;
} | {
    type: "list";
    value: TimeRange[];
};
export declare function serializeTimeRange(value: TimeRange): any;
export declare function isTimeRange(value: any): value is TimeRange;
export declare function deserializeTimeRange(value: any): TimeRange;
