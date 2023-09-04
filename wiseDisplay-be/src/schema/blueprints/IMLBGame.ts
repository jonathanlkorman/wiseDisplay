import { IGame } from "./IGame";

export interface IMLBGame extends IGame {
    inning: number,
    outs: number | null,
    strikes: number | null,
    balls: number | null,
    onFirst: boolean | null,
    onSecond: boolean | null,
    onThird: boolean | null,
}