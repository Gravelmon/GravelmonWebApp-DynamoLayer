"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceLocation = void 0;
class ResourceLocation {
    constructor(namespace, path) {
        this.namespace = namespace;
        this.path = path;
    }
    toString() {
        return `${this.namespace}:${this.path}`;
    }
    static fromString(location) {
        const [namespace, path] = location.split(":");
        return new ResourceLocation(namespace, path);
    }
    serialize() {
        return {
            namespace: this.namespace,
            path: this.path
        };
    }
    static deserialize(data) {
        if (typeof data === "object" && "namespace" in data && "path" in data) {
            return new ResourceLocation(data.namespace, data.path);
        }
        else {
            throw new Error(`Invalid ResourceLocation format: ${JSON.stringify(data)}`);
        }
    }
}
exports.ResourceLocation = ResourceLocation;
