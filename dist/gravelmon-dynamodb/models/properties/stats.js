"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
class Stats {
    constructor(hp, attack, defense, specialAttack, specialDefense, speed, placeholder = false) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.speed = speed;
        this.placeholder = placeholder;
    }
    getTotal() {
        return this.hp + this.attack + this.defense + this.specialAttack + this.specialDefense + this.speed;
    }
    serialize() {
        return {
            hp: this.hp,
            attack: this.attack,
            defense: this.defense,
            specialAttack: this.specialAttack,
            specialDefense: this.specialDefense,
            speed: this.speed,
            placeholder: this.placeholder
        };
    }
    static deserialize(data) {
        return new Stats(data.hp, data.attack, data.defense, data.specialAttack, data.specialDefense, data.speed, data.placeholder || false);
    }
}
exports.Stats = Stats;
