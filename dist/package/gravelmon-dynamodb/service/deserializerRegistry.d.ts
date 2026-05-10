export type Deserializer<T> = (data: Record<string, any>) => T;
export declare class DeserializerRegistry {
    private map;
    register<T>(type: string, fn: Deserializer<T>): void;
    get<T>(type: string): Deserializer<T> | undefined;
    deserialize<T>(entityType: string, data: Record<string, any>): T;
}
export declare const deserializerRegistry: DeserializerRegistry;
