"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemNode = exports.ItemEntity = void 0;
exports.createItemNode = createItemNode;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.ItemEntity = "Item";
class ItemNode extends dynamoNodes_1.DynamoNode {
    constructor(name, resourceLocation, isPlaceable, s3TextureLocation, inBattleEffect, rebalancedInBattleEffect) {
        super(exports.ItemEntity, name);
        this.isPlaceable = false;
        this.resourceLocation = resourceLocation;
        this.s3TextureLocation = s3TextureLocation;
        this.isPlaceable = isPlaceable;
        this.inBattleEffect = inBattleEffect;
        this.rebalancedInBattleEffect = rebalancedInBattleEffect;
    }
    static deserialize(data) {
        if (!data.resourceLocation) {
            throw new Error("Invalid data for deserializing ItemNode: missing resourceLocation");
        }
        return new ItemNode(data.name, resourceLocation_1.ResourceLocation.deserialize(data.resourceLocation), data.isPlaceable, data.s3TextureLocation, data.inBattleEffect, data.rebalancedInBattleEffect);
    }
    serialize() {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            isPlaceable: this.isPlaceable,
            s3TextureLocation: this.s3TextureLocation,
            inBattleEffect: this.inBattleEffect,
            rebalancedInBattleEffect: this.rebalancedInBattleEffect
        };
    }
}
exports.ItemNode = ItemNode;
function createItemNode(name, resourceLocation, isPlaceable = false, s3TextureLocation = "", inBattleEffect = "", rebalancedInBattleEffect = "") {
    return new ItemNode(name, resourceLocation, isPlaceable, s3TextureLocation, inBattleEffect, rebalancedInBattleEffect);
}
deserializerRegistry_1.deserializerRegistry.register(exports.ItemEntity, ItemNode.deserialize);
