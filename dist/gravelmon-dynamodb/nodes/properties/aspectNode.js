"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceAspectNode = exports.FlagAspectNode = exports.AspectType = exports.HasAspectEdgeType = exports.AspectEntity = void 0;
exports.createFlagAspectNode = createFlagAspectNode;
exports.createChoiceAspectNode = createChoiceAspectNode;
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.AspectEntity = "Aspect";
exports.HasAspectEdgeType = "HasAspect";
var AspectType;
(function (AspectType) {
    AspectType[AspectType["Flag"] = 0] = "Flag";
    AspectType[AspectType["Choice"] = 1] = "Choice";
})(AspectType || (exports.AspectType = AspectType = {}));
function createFlagAspectNode(name, defaultValue = false, isPrimaryAspect = true, introducedByGame, lastEdited = Date.now()) {
    return new FlagAspectNode(name, defaultValue, isPrimaryAspect, introducedByGame, lastEdited);
}
function createChoiceAspectNode(name, choices, defaultValue = "random", isPrimaryAspect = false, introducedByGame, lastEdited = Date.now()) {
    return new ChoiceAspectNode(name, choices, defaultValue, isPrimaryAspect, introducedByGame, lastEdited);
}
class AspectNode extends dynamoNodes_1.DynamoNode {
    constructor(name, aspectType, defaultValue, isPrimaryAspect, introducedByGame, lastEdited = Date.now()) {
        super(exports.AspectEntity + aspectType, name, AspectNode.version, lastEdited);
        this.isAspect = true;
        this.aspectType = aspectType;
        this.defaultOption = defaultValue;
        this.isPrimaryAspect = isPrimaryAspect;
        this.introducedByGame = introducedByGame;
    }
    static deserialize(data) {
        if (data.aspectType === undefined ||
            data.defaultOption === undefined ||
            data.isPrimaryAspect === undefined ||
            data.introducedByGame === undefined) {
            throw new Error("Invalid data for deserializing AspectNode: missing required properties");
        }
        const aspectType = data.aspectType;
        const defaultOption = data.defaultOption;
        const isPrimaryAspect = data.isPrimaryAspect;
        const introducedByGame = data.introducedByGame;
        const name = data.name;
        if (aspectType === AspectType.Flag) {
            return new FlagAspectNode(name, defaultOption, isPrimaryAspect, introducedByGame, data.lastEdited);
        }
        else if (aspectType === AspectType.Choice) {
            if (!data.choices) {
                throw new Error("Invalid data for deserializing ChoiceAspectNode: missing choices property");
            }
            const choices = data.choices;
            return new ChoiceAspectNode(name, choices, defaultOption, isPrimaryAspect, introducedByGame, data.lastEdited);
        }
        else {
            throw new Error("Invalid aspect type for deserializing AspectNode");
        }
    }
    serialize() {
        return {
            ...super.serialize(),
            aspectType: this.aspectType,
            isAspect: this.isAspect,
            defaultOption: this.defaultOption,
            isPrimaryAspect: this.isPrimaryAspect,
            introducedByGame: this.introducedByGame
        };
    }
}
AspectNode.version = 1;
class FlagAspectNode extends AspectNode {
    constructor(name, defaultValue = false, isPrimaryAspect = true, introducedByGame, lastEdited = Date.now()) {
        super(name, AspectType.Flag, defaultValue, isPrimaryAspect, introducedByGame, lastEdited);
    }
}
exports.FlagAspectNode = FlagAspectNode;
class ChoiceAspectNode extends AspectNode {
    constructor(name, choices, defaultValue = "random", isPrimaryAspect = false, introducedByGame, lastEdited = Date.now()) {
        super(name, AspectType.Choice, defaultValue, isPrimaryAspect, introducedByGame, lastEdited);
        this.choices = choices;
    }
    static deserialize(data) {
        if (!data.choices) {
            throw new Error("Invalid data for deserializing ChoiceAspectNode: missing choices property");
        }
        const choices = data.choices;
        return new ChoiceAspectNode(data.name, choices, data.defaultOption, data.isPrimaryAspect, data.introducedByGame, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            choices: this.choices
        };
    }
}
exports.ChoiceAspectNode = ChoiceAspectNode;
deserializerRegistry_1.deserializerRegistry.register(exports.AspectEntity + AspectType.Flag, AspectNode.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.AspectEntity + AspectType.Choice, AspectNode.deserialize);
