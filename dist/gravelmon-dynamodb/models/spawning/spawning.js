"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnBucket = exports.SpawnablePositionType = void 0;
var SpawnablePositionType;
(function (SpawnablePositionType) {
    SpawnablePositionType["Grounded"] = "grounded";
    SpawnablePositionType["Submerged"] = "submerged";
    SpawnablePositionType["Surface"] = "surface";
    SpawnablePositionType["Fishing"] = "fishing";
})(SpawnablePositionType || (exports.SpawnablePositionType = SpawnablePositionType = {}));
var SpawnBucket;
(function (SpawnBucket) {
    SpawnBucket["COMMON"] = "common";
    SpawnBucket["UNCOMMON"] = "uncommon";
    SpawnBucket["RARE"] = "rare";
    SpawnBucket["ULTRA_RARE"] = "ultra-rare";
})(SpawnBucket || (exports.SpawnBucket = SpawnBucket = {}));
