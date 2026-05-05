export declare class Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    placeholder?: boolean;
    constructor(hp: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number, placeholder?: boolean);
    getTotal(): number;
    serialize(): Record<string, any>;
    static deserialize(data: any): Stats;
}
