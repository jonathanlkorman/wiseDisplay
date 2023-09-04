import { ITeam } from "schema/blueprints/IGame";

export class Team implements ITeam {
    private _teamName: string;
    private _id: string;
    private _score: number;
    private _color: string;
    private _altcolor: string;
    private _record?: string;

    constructor(data: ITeam){
        this._teamName = data.teamName,
        this._id = data.id,
        this._score = data.score,
        this._color = data.color,
        this._altcolor = data.altcolor,
        this._record = data.record
    }

    public get teamName(): string {
        return this._teamName;
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
    public get altcolor(): string {
        return this._altcolor;
    }
    public get record(): string | undefined {
        return this._record;
    }
}