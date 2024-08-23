import { $enum } from "ts-enum-util";

import { ESPN_NFL_PLAY, INFLGame } from "../blueprints/INFLGame";
import { Game } from "./Game";

export class NFLGame extends Game implements INFLGame {
    private _quarter: number;
    private _possession: string | null;
    private _redzone: boolean;
    private _down: string | null;
    private _spot: string | null;
    private _awayTimeouts: number | null;
    private _homeTimeouts: number | null;
    private _lastPlayId: string | null;
    private _lastPlayTeamId: string | null;
    private _lastPlayScoreValue: number | null;

    constructor(data: INFLGame) {
        super(data),
            this._quarter = data.quarter,
            this._possession = data?.possession,
            this._redzone = data?.redzone,
            this._down = data?.down,
            this._spot = data?.spot,
            this._awayTimeouts = data?.awayTimeouts,
            this._homeTimeouts = data?.homeTimeouts
            this._lastPlayId = data?.lastPlayId;
            this._lastPlayTeamId = data?.lastPlayTeamId;
            this._lastPlayScoreValue = data?.lastPlayScoreValue
    }

    public get quarter(): number {
        return this._quarter;
    }
    public get possession(): string | null {
        return this._possession ?? null;
    }
    public get redzone(): boolean {
        return this._redzone ?? false;
    }
    public get down(): string | null {
        return this._down ?? null;
    }
    public get spot(): string | null {
        return this._spot ?? null;
    }
    public get awayTimeouts(): number | null {
        return this._awayTimeouts ?? null;
    }
    public get homeTimeouts(): number | null {
        return this._homeTimeouts ?? null;
    }
    public get lastPlay(): ESPN_NFL_PLAY {
        const key = $enum(ESPN_NFL_PLAY).getKeyOrDefault(this._lastPlayId, null);
        return key ? ESPN_NFL_PLAY[key as keyof typeof ESPN_NFL_PLAY] : null;
    }
    public get lastPlayTeamId(): string {
        return this._lastPlayTeamId ?? null;
    }
    public get lastPlayScoreValue(): number {
        return this._lastPlayScoreValue ?? null;
    }
    public get displayQuarter(): string {
        const ORDINAL = ['Pre', '1st', '2nd', '3rd', '4th', 'OT'];
        return ORDINAL[this.quarter];
    }
}