"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializerRegistry = void 0;
const dynamoNodes_1 = require("./dynamoNodes");
class DeserializerRegistry {
    constructor() {
        this.map = new Map();
    }
    register(type, fn) {
        this.map.set(type, fn);
    }
    get(type) {
        return this.map.get(type);
    }
    deserialize(entityType, itemType, data) {
        const fn = this.map.get(entityType);
        if (!fn) {
            switch (itemType) {
                case dynamoNodes_1.ItemType.NODE: return dynamoNodes_1.DynamoNode.deserialize(data);
                case dynamoNodes_1.ItemType.EDGE: return dynamoNodes_1.DynamoEdge.deserialize(data);
                default: throw new Error(`No deserializer registered for ${entityType}`);
            }
        }
        return fn(data);
    }
}
exports.deserializerRegistry = new DeserializerRegistry();
