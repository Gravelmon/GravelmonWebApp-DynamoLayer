import { DynamoNode } from "./dynamoNodes";

export type Deserializer<T> = (data: Record<string, any>) => T;

export class DeserializerRegistry {
    private map = new Map<string, Deserializer<any>>();

    register<T>(type: string, fn: Deserializer<T>) {
        this.map.set(type, fn);
    }

    get<T>(type: string): Deserializer<T> | undefined {
        return this.map.get(type);
    }

    deserialize<T>(entityType: string, data: Record<string, any>): T {
        const fn = this.map.get(entityType);

        if (!fn) return DynamoNode.deserialize(data) as T;

        return fn(data);
    }
}

export const deserializerRegistry = new DeserializerRegistry();