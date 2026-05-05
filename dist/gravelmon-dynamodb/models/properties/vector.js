"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeVector = serializeVector;
exports.deserializeVector = deserializeVector;
function serializeVector(vector) {
    return {
        x: vector.x,
        y: vector.y,
        z: vector.z
    };
}
function deserializeVector(data) {
    return {
        x: data.x,
        y: data.y,
        z: data.z
    };
}
