"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRange = void 0;
class NumberRange {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    static fromFlat(flatRange) {
        return new NumberRange(flatRange, flatRange);
    }
    serialize() {
        return {
            min: this.min,
            max: this.max
        };
    }
    static deserialize(data) {
        if (typeof data === "object" && "min" in data && "max" in data) {
            return new NumberRange(data.min, data.max);
        }
        else {
            throw new Error(`Invalid NumberRange format: ${JSON.stringify(data)}`);
        }
    }
}
exports.NumberRange = NumberRange;
