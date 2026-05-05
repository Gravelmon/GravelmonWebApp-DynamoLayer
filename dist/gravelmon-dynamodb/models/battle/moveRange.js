"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveRange = void 0;
var MoveRange;
(function (MoveRange) {
    MoveRange[MoveRange["SingleTarget"] = 0] = "SingleTarget";
    MoveRange[MoveRange["Self"] = 1] = "Self";
    MoveRange[MoveRange["SingleAlly"] = 2] = "SingleAlly";
    MoveRange[MoveRange["AllPokemon"] = 3] = "AllPokemon";
    MoveRange[MoveRange["AllAllies"] = 4] = "AllAllies";
    MoveRange[MoveRange["AllOpponents"] = 5] = "AllOpponents";
    MoveRange[MoveRange["RandomOpponent"] = 6] = "RandomOpponent";
    MoveRange[MoveRange["EntireField"] = 7] = "EntireField";
    MoveRange[MoveRange["OpponentSide"] = 8] = "OpponentSide";
    MoveRange[MoveRange["UserSide"] = 9] = "UserSide";
    MoveRange[MoveRange["Varies"] = 10] = "Varies";
})(MoveRange || (exports.MoveRange = MoveRange = {}));
