"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSeat = serializeSeat;
exports.deserializeSeat = deserializeSeat;
const vector_1 = require("../properties/vector");
function serializeSeat(seat) {
    return {
        offset: (0, vector_1.serializeVector)(seat.offset),
        poseOffsets: seat.poseOffsets.map(po => ({
            offset: (0, vector_1.serializeVector)(po.offset),
            poseTypes: po.poseTypes
        }))
    };
}
function deserializeSeat(data) {
    return {
        offset: (0, vector_1.deserializeVector)(data.offset),
        poseOffsets: data.poseOffsets.map((po) => ({
            offset: (0, vector_1.deserializeVector)(po.offset),
            poseTypes: po.poseTypes
        }))
    };
}
