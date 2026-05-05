import { DynamoEdge } from '../../service/dynamoNodes';
import { ResourceLocation } from '../minecraft/resourceLocation';
import { PokemonIdentifier } from '../../nodes/pokemon/pokemonNode';
import { NumberRange } from '../properties/numberRange';
import { SpawnablePositionType, SpawnBucket } from './spawning';
import { SpawnCondition } from "./spawnCondition";
export declare const SpawnDataEntity = "SpawnData";
export declare const PartOfHerdEdgeType = "PartOfHerd";
export declare const SpawnsEdgeType = "Spawns";
export declare const PreferredBlockEdgeType = "PreferredBlock";
export declare const RequiredBlockEdgeType = "RequiredBlock";
export declare const UsesPresetEdgeType = "UsesPreset";
export declare enum SpawnType {
    Pokemon = "pokemon",
    Pokemon_Herd = "pokemon-herd"
}
interface HerdSpawnEntry {
    pokemonIdentifier: PokemonIdentifier;
    levelRange: NumberRange;
    weight: number;
    maxTimes?: number;
    isLeader?: boolean;
    levelRangeOffset: NumberRange;
}
export interface SpawnData {
    levelRange: NumberRange;
    spawnType: SpawnType;
    spawnWeight: number;
    spawnablePositionTypes: SpawnablePositionType;
    spawnBucket: SpawnBucket;
    moonPhaseMultiplier?: number;
    weightMultiplier?: number;
    maxHerdSize?: number;
    minDistanceBetweenSpawns?: number;
    condition?: SpawnCondition;
    antiCondition?: SpawnCondition;
    herdSpawnEntries?: HerdSpawnEntry[];
    preferredBlocks?: ResourceLocation[];
    requiredBlocks?: ResourceLocation[];
}
export declare function serializeSpawnData(spawnDataNode: SpawnData): any;
export declare function deserializeSpawnData(data: any): SpawnData;
export declare function createSpawnDataUsesSpawnPresetEdge(spawnDataName: PokemonIdentifier, spawnPresetName: string): DynamoEdge;
export declare function createSpawnDataPrefersBlockEdge(spawnDataName: PokemonIdentifier, blockName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataRequiresBlockEdge(spawnDataName: PokemonIdentifier, blockName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataDoesNotSpawnInBiomeEdge(spawnDataName: PokemonIdentifier, biomeName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataDoesNotSpawnInBiomeTagEdge(spawnDataName: PokemonIdentifier, biomeTagName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataSpawnsInBiomeEdge(spawnDataName: PokemonIdentifier, biomeName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataSpawnsInBiomeTagEdge(spawnDataName: PokemonIdentifier, biomeTagName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataSpawnsInStructureEdge(spawnDataName: PokemonIdentifier, StructureName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataSpawnsInStructureTagEdge(spawnDataName: PokemonIdentifier, StructureTagName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataDoesNotSpawnInStructureEdge(spawnDataName: PokemonIdentifier, StructureName: ResourceLocation): DynamoEdge;
export declare function createSpawnDataDoesNotSpawnInStructureTagEdge(spawnDataName: PokemonIdentifier, StructureTagName: ResourceLocation): DynamoEdge;
export {};
