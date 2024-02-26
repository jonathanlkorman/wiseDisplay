import { IGame, IPlayer } from "./IGame";

export interface IMLBGame extends IGame {
    inning: string,
    outs: number | null,
    strikes: number | null,
    balls: number | null,
    onFirst: boolean | null,
    onSecond: boolean | null,
    onThird: boolean | null,
    batter: IPlayer | null,
    pitcher: IPlayer | null,
    dueUp: IPlayer[] | null,
}