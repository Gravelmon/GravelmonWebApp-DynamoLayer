import { MoveIdentifier, PokemonIdentifier } from "../nodes";
import { ResourceLocation } from "./minecraft/resourceLocation";

export interface GameData {
    name: string;
    namespace: string;
    developer: string;
    websiteURL: string;
    isPermitted: boolean;
    s3LogoLocation?: string;
    introducesPokemon: Record<number, PokemonIdentifier>; //dex number to pokemon identifier
    introducesItem: ResourceLocation[];
    introducesMoves: MoveIdentifier[];
    introducesAbilities: string[];
    introducesSpeciesFeatures: string[];
    introducesMechanics: string[];
    introducesTypes: string[];
    starterPokemon?: StarterPokemon;
}

export interface StarterPokemon { pokemon: PokemonIdentifier[] }