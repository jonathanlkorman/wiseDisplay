import { IGame } from "../blueprints/IGame";
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
        this._isLive = data.isLive
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

    public get displayDate(): { day: string, time: string } {
        const currentDate: Date = new Date();
        const timestamp = Date.parse(this._date);
        const eventDate = new Date(timestamp);
    
        const eventDateString = eventDate.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    
        if (
            eventDate.getFullYear() === currentDate.getFullYear() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getDate() === currentDate.getDate()
        ) {
            return {
                day: 'TODAY',
                time: eventDateString.split(', ')[1] // Extract time
            };
        } else {
            const [day, time] = eventDateString.split(', ');
            return {
                day,
                time
            };
        }
    }
    

    public includesFav(favTeams: string[]): boolean {
        return favTeams.includes(this.awayteam.teamShortName) || favTeams.includes(this.hometeam.teamShortName);
    };
}