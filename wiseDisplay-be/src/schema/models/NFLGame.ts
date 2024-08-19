import { INFLGame } from "schema/blueprints/INFLGame";
import { Game } from "./Game";
import { NFL_PLAY } from "../../../../wiseDisplay-api/interfaces/IApiNFLPlay";

export class NFLGame extends Game implements INFLGame {
    private _quarter: number;
    private _possession: string | null;
    private _redzone: boolean;
    private _down: string | null;
    private _spot: string | null;
    private _awayTimeouts: number | null;
    private _homeTimeouts: number | null;
    private _lastPlayId: string | null;
    private _lastPlayTeam: string | null;

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
        this._lastPlayTeam = data?.lastPlayTeam;
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
    public get lastPlayId(): string {
        return this._lastPlayId ?? null;
    }
    public get lastPlayTeam(): string {
        return this._lastPlayTeam ?? null;
    }
    public get displayQuarter(): string {
        const ORDINAL = ['Pre', '1st', '2nd', '3rd', '4th', 'OT'];
        return ORDINAL[this.quarter];
    }
}