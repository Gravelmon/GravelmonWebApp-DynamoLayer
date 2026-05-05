"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
exports.serializeTimeRange = serializeTimeRange;
exports.isTimeRange = isTimeRange;
exports.deserializeTimeRange = deserializeTimeRange;
const numberRange_1 = require("./numberRange");
var Time;
(function (Time) {
    Time["Day"] = "day";
    Time["Night"] = "night";
    Time["Dawn"] = "dawn";
    Time["Dusk"] = "dusk";
})(Time || (exports.Time = Time = {}));
function serializeTimeRange(value) {
    switch (value.type) {
        case "time": return value.value;
        case "range": return value.value.serialize();
        case "list": return value.value.map(serializeTimeRange);
    }
}
function isTimeRange(value) {
    return (value &&
        typeof value === "object" &&
        "type" in value &&
        ["time", "range", "list"].includes(value.type));
}
function deserializeTimeRange(value) {
    if (!value) {
        throw new Error("Invalid TimeRange: value is null/undefined");
    }
    if (Array.isArray(value)) {
        return {
            type: "list",
            value: value.map(deserializeTimeRange)
        };
    }
    if (typeof value === "object" && "min" in value && "max" in value) {
        return {
            type: "range",
            value: numberRange_1.NumberRange.deserialize(value)
        };
    }
    if (typeof value === "string") {
        if (!Object.values(Time).includes(value)) {
            throw new Error(`Invalid Time value: ${value}`);
        }
        return {
            type: "time",
            value: value
        };
    }
    throw new Error(`Unknown TimeRange format: ${JSON.stringify(value)}`);
}
