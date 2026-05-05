"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = parseBody;
function parseBody(event) {
    if (!event.body) {
        throw new Error("Missing body");
    }
    return JSON.parse(event.body);
}
