"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderDifferenceNode = void 0;
class GenderDifferenceNode {
    constructor(hasGenderedTexture = false, hasGenderedModel = false, hasGenderedAnimation = false) {
        this.hasGenderedTexture = hasGenderedTexture;
        this.hasGenderedModel = hasGenderedModel;
        this.hasGenderedAnimation = hasGenderedAnimation;
    }
}
exports.GenderDifferenceNode = GenderDifferenceNode;
