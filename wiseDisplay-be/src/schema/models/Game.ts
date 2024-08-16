import { IGame } from "../blueprints/IGame";
import { Odds } from "./Odds";
import { Team } from "./Team";

export class Game implements IGame {
    private _league: string;
    private _name: string;
    private _date: string;
    private _hometeam: Team;
    private _awayteam: Team;
    private _time: string;
    private _over: boolean;
    private _detail: string;
    private _halftime?: boolean;
    private _state: string;
    private _isLive: boolean;
    private _odds: Odds;

    constructor(data: IGame){
        this._league = data.league,
        this._name = data.name,
        this._date = data.date,
        this._hometeam = new Team(data.hometeam),
        this._awayteam = new Team(data.awayteam),
        this._time = data.time,
        this._over = data.over,
        this._detail = data.detail,
        this._halftime = data.halftime,
        this._state = data.state,
        this._isLive = data.isLive,
        this._odds = new Odds(data.odds)
    }

    public get league(): string {
        return this._league;
    }
    public get name(): string {
        return this._name;
    }
    public get date(): string {
        return this._date;
    }
    public get hometeam(): Team {
        return this._hometeam;
    }
    public get awayteam(): Team {
        return this._awayteam;
    }
    public get time(): string {
        if(['0.00', '0.0'].indexOf(this._time) >= 0) {
            return "END"
        }
        return this._time;
    }
    public get over(): boolean {
        return this._over;
    }
    public get detail(): string {
        return this._detail;
    }
    public get halftime(): boolean | undefined {
        return this._halftime;
    }
    public get state(): string {
        return this._state;
    }
    public get isLive(): boolean {
        return this._isLive;
    }
    public get odds(): Odds {
        return this._odds;
    }

    public includesFav(favTeams: string[]): boolean {
        return favTeams.includes(this.awayteam.teamFullName) || favTeams.includes(this.hometeam.teamFullName);
    };
}