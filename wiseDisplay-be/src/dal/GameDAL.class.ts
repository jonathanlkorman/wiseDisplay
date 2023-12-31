import { INFLGame } from "../schema/blueprints/INFLGame";
import { NFLGame } from "../schema/models/NFLGame";
import { INBAGame } from "../schema/blueprints/INBAGame";
import { NBAGame } from "../schema/models/NBAGame";
import { INHLGame } from "../schema/blueprints/INHLGame";
import { NHLGame } from "../schema/models/NHLGame";
import { IMLBGame } from "../schema/blueprints/IMLBGame";
import { MLBGame } from "../schema/models/MLBGame";

export class GameDAL {
    public static async getNFLGames(): Promise<NFLGame[]> {
        try {
        
            const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard', {method: 'GET'});
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();
            
            const league = data.leagues[0].abbreviation;
            const games: INFLGame[] = data.events.map((event: any) => {
                const info = event.competitions[0];
                const game: INFLGame = {
                    league: league,
                    name: event.shortName,
                    date: event.date,
                    hometeam: {
                        teamName: info.competitors[0].team.abbreviation, 
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color, 
                        altcolor: info.competitors[0].team.alternateColor,
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamName: info.competitors[1].team.abbreviation, 
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color, 
                        altcolor: info.competitors[1].team.alternateColor,
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    quarter: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail, 
                    halftime: info.status.type.name,
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    homeTimeouts: info?.situation?.homeTimeouts ?? 0,
                    awayTimeouts: info?.situation?.awayTimeouts ?? 0,
                    down: info?.situation?.shortDownDistanceText, 
                    spot: info?.situation?.possessionText,
                    redzone: info?.situation?.isRedZone, 
                    possession: info?.situation?.possession, 
                }
                return game;
            });
            return games.map(game => new NFLGame(game));
        } catch (error){
            console.log(error)
            return [];
        }
        
    }

    public static async getNBAGames(): Promise<NBAGame[]> {
        try {
            const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', {method: 'GET'});
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();

            const league = data.leagues[0].abbreviation;
            const games: INBAGame[] = data.events.map((event: any) => {
                const info = event.competitions[0];
                const game: INBAGame = {
                    league: league,
                    name: event.shortName,
                    date: event.date,
                    hometeam: {
                        teamName: info.competitors[0].team.abbreviation, 
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color, 
                        altcolor: info.competitors[0].team.alternateColor,
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamName: info.competitors[1].team.abbreviation, 
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color, 
                        altcolor: info.competitors[1].team.alternateColor,
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    quarter: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail,  
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                }
                return game;
            });
            return games.map(game => new NBAGame(game));
        } catch(error) {
            console.log(error)
            return[];
        }
    }

    public static async getNHLGames(): Promise<NHLGame[]> {
        try {
            const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard', {method: 'GET'});
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();

            const league = data.leagues[0].abbreviation;
            const games: INHLGame[] = data.events.map((event: any) => {
                const info = event.competitions[0];
                const game: INHLGame = {
                    league: league,
                    name: event.shortName,
                    date: event.date,
                    hometeam: {
                        teamName: info.competitors[0].team.abbreviation, 
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score), 
                        color: info.competitors[0].team.color, 
                        altcolor: info.competitors[0].team.alternateColor,
                    },
                    awayteam: {
                        teamName: info.competitors[1].team.abbreviation, 
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color, 
                        altcolor: info.competitors[1].team.alternateColor,
                    },
                    time: info.status.displayClock, 
                    period: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail, 
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                }
                return game;
            });
            return games.map(game => new NHLGame(game));
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    public static async getMLBGames(): Promise<MLBGame[]> {
        try {
            const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard', {method: 'GET'});
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();

            const league = data.leagues[0].abbreviation;
            const games: IMLBGame[] = data.events.map((event: any) => {
                const info = event.competitions[0];
                const game: IMLBGame = {
                    league: league,
                    name: event.shortName,
                    date: event.date,
                    hometeam: {
                        teamName: info.competitors[0].team.abbreviation, 
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color, 
                        altcolor: info.competitors[0].team.alternateColor,
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamName: info.competitors[1].team.abbreviation, 
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color, 
                        altcolor: info.competitors[1].team.alternateColor,
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    inning: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail,  
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    outs: info?.situation?.outs,
                    strikes: info?.situation?.strikes,
                    balls: info?.situation?.balls,
                    onFirst: info?.situation?.onFirst,
                    onSecond: info?.situation?.onSecond,
                    onThird: info?.situation?.onThird,
                }
                return game;
            });
            return games.map(game => new MLBGame(game));
        } catch(error) {
            console.log(error);
            return [];
        }
    }
}