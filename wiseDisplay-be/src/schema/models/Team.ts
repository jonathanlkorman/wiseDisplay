import { ITeam } from "schema/blueprints/IGame";

export class Team implements ITeam {
    private static readonly DEFAULT_RECORD = "0-0";
    private _teamShortName: string;
    private _teamFullName: string;
    private _id: string;
    private _score: number;
    private _color: string;
    private _logo: string;
    private _altcolor: string;
    private _record?: string;

    constructor(data: ITeam){
        this._teamShortName = data.teamShortName,
        this._teamFullName = data.teamFullName,
        this._id = data.id,
        this._score = data.score,
        this._color = data.color,
        this._logo = data.logo,
        this._altcolor = data.altcolor,
        this._record = data.record
    }

    public get teamShortName(): string {
        return this._teamShortName;
    }
    public get teamFullName(): string {
        return this._teamFullName;
    }
    public get id(): string {
        return this._id;
    }
    public get score(): number {
        return this._score;
    }
    public get color(): string {
        return this._color;
    }
    public get logo(): string {
        return this._logo;
    }
    public get altcolor(): string {
        return this._altcolor;
    }
    public get record(): string {
        return this._record ?? Team.DEFAULT_RECORD;
    }
}