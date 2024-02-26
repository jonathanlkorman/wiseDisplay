import { IPlayer } from "schema/blueprints/IGame";
import { IMLBGame } from "../blueprints/IMLBGame";
import { Game } from "./Game";
import { Player } from "./Player";

export class MLBGame extends Game implements IMLBGame {
    private _inning: string;
    private _outs: number | null;
    private _strikes: number | null;
    private _balls: number | null;
    private _onFirst: boolean;
    private _onSecond: boolean;
    private _onThird: boolean;
    private _batter: Player | null;
    private _pitcher: Player | null;
    private _dueUp: Player[] | null;

    constructor(data: IMLBGame){
        super(data),
        this._inning = data.inning,
        this._outs = data?.outs,
        this._strikes = data?.strikes,
        this._balls = data?.balls,
        this._onFirst = data?.onFirst,
        this._onSecond = data?.onSecond,
        this._onThird = data?.onThird,
        this._batter = new Player(data?.batter),
        this._pitcher = new Player(data?.pitcher)
        this._dueUp = data?.dueUp?.map(player => new Player(player))

    }

    public get inning(): string {
        return this._inning;
    }
    public get outs(): number | null {
        return this._outs ?? null;
    }
    public get strikes(): number | null {
        return this._strikes ?? null;
    }
    public get balls(): number | null {
        return this._balls ?? null;
    }
    public get onFirst(): boolean {
        return this._onFirst ?? false;
    }
    public get onSecond(): boolean {
        return this._onSecond ?? false;
    }
    public get onThird(): boolean {
        return this._onThird ?? false;
    }
    public get batter(): Player {
        return this._batter;
    }
    public get pitcher(): Player {
        return this._pitcher;
    }
    public get dueUp(): Player[] | null {
        return this._dueUp;
    }
}