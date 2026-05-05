"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoEdge = exports.DynamoNode = exports.DynamoItem = exports.ItemType = void 0;
exports.getNodePK = getNodePK;
exports.getEdgeSK = getEdgeSK;
exports.getPkType = getPkType;
exports.getPkName = getPkName;
var ItemType;
(function (ItemType) {
    ItemType["NODE"] = "NODE";
    ItemType["EDGE"] = "EDGE";
})(ItemType || (exports.ItemType = ItemType = {}));
class DynamoItem {
    constructor(pk, sk, type, entityType, version = 1, lastEdited = Date.now()) {
        this.PK = pk;
        this.SK = sk;
        this.TYPE = type;
        this.entityType = entityType;
        this.version = version;
        this.lastEdited = lastEdited;
    }
    serialize() {
        return {
            PK: this.PK,
            SK: this.SK,
            TYPE: this.TYPE,
            entityType: this.entityType,
            version: this.version,
            lastEdited: this.lastEdited,
        };
    }
}
exports.DynamoItem = DynamoItem;
class DynamoNode extends DynamoItem {
    constructor(entityType, name, version = 1, lastEdited = Date.now()) {
        super(getNodePK(entityType, name), "METADATA", ItemType.NODE, entityType, version, lastEdited);
        this.name = name;
    }
    static deserialize(data) {
        return new DynamoNode(data.entityType, data.name, data.version, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            name: this.name,
        };
    }
}
exports.DynamoNode = DynamoNode;
class DynamoEdge extends DynamoItem {
    constructor(pk, edgeType, targetEntityType, targetName, version = 1, lastEdited = Date.now()) {
        super(pk, getEdgeSK(edgeType, targetEntityType, targetName), ItemType.EDGE, edgeType, version, lastEdited);
        this.target = getNodePK(targetEntityType, targetName);
        this.sourceType = getPkType(pk);
        this.targetType = targetEntityType;
        this.targetName = targetName;
    }
    static deserialize(data) {
        const edgeType = data.entityType;
        const targetType = data.targetType;
        const targetName = data.targetName;
        return new DynamoEdge(data.PK, edgeType, targetType, targetName, data.version, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            target: this.target,
            sourceType: this.sourceType,
            targetType: this.targetType,
            targetName: this.targetName,
        };
    }
}
exports.DynamoEdge = DynamoEdge;
function getNodePK(type, name) {
    return `NODE#${type}#${name}`;
}
function getEdgeSK(edgeType, targetType, targetName) {
    return `EDGE#${edgeType}#${targetType}#${targetName}`;
}
function getPkType(pk) {
    const parts = pk.split('#');
    if (parts.length < 2) {
        throw new Error(`Invalid PK format: ${pk}`);
    }
    return parts[1];
}
function getPkName(pk) {
    const parts = pk.split('#');
    if (parts.length < 3) {
        throw new Error(`Invalid PK format: ${pk}`);
    }
    return parts[2];
}
