import { MoveIdentifier, PokemonIdentifier } from "../nodes";
import { ResourceLocation } from "./minecraft/resourceLocation";
export interface StarterPokemon {
    region: string;
    afterRegion?: string;
    starters: PokemonIdentifier[];
}
export interface GameData {
    name: string;
    namespace: string;
    developer: string;
    websiteURL: string;
    isPermitted: boolean;
    isEngineCollection: boolean;
    s3LogoLocation?: string;
    introducesPokemon: Record<number, PokemonIdentifier>;
    introducesItem: ResourceLocation[];
    introducesMoves: MoveIdentifier[];
    introducesAbilities: string[];
    introducesSpeciesFeatures: string[];
    introducesMechanics: string[];
    introducesTypes: string[];
    starterPokemon?: StarterPokemon[];
}
