import { MoveIdentifier, PokemonIdentifier } from "../nodes";
import { ResourceLocation } from "./minecraft/resourceLocation";
export interface GameData {
    name: string;
    namespace?: string;
    developer: string;
    websiteURL: string;
    isPermitted: boolean;
    s3LogoLocation?: string;
    introducesPokemon: Record<number, PokemonIdentifier>;
    introducesItem: ResourceLocation[];
    introducesMoves: MoveIdentifier[];
    introducesAbilities: string[];
    introducesAspects: string[];
    introducesMechanics: string[];
    introducesTypes: string[];
    starterPokemon?: StarterPokemon;
}
export interface StarterPokemon {
    pokemon: PokemonIdentifier[];
}
