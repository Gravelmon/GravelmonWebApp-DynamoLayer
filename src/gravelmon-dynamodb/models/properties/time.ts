import { NumberRange } from "./numberRange";

export enum Time {
    Day = "day",
    Any = "any",
    Night = "night",
    Twilight = "twilight",
    Dawn = "dawn",
    Dusk = "dusk",
    Noon = "noon"
}

export type TimeRange =
    | { type: "time"; value: Time }
    | { type: "range"; value: NumberRange }
    | { type: "list"; value: TimeRange[] };

export function serializeTimeRange(value: TimeRange): any {
    switch (value.type) {
        case "time": return value.value;
        case "range": return value.value.serialize();
        case "list": return value.value.map(serializeTimeRange);
    }
}

export function isTimeRange(value: any): value is TimeRange {
    return (
        value &&
        typeof value === "object" &&
        "type" in value &&
        ["time", "range", "list"].includes(value.type)
    );
}

export function deserializeTimeRange(value: any): TimeRange {
    console.log("deserializing time range from object: " + value);
    if (!value) {
        throw new Error("Invalid TimeRange: value is null/undefined");
    }

    if (value.type === "list") {
        let values : any[] = value.value;
        return {
            type: "list",
            value: values.map(deserializeTimeRange)
        };
    }

    if (value.type === "range") {
        return {
            type: "range",
            value: NumberRange.deserialize(value.value)
        };
    }

    if (value.type === "time") {
        if (!Object.values(Time).includes(value.value as Time)) {
            throw new Error(`Invalid Time value: ${value.value}`);
        }

        return {
            type: "time",
            value: value.value as Time
        };
    }

    throw new Error(`Unknown TimeRange format: ${JSON.stringify(value)}`);
}