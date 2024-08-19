import { INFLGame } from "../schema/blueprints/INFLGame";
import { NFLGame } from "../schema/models/NFLGame";
import { INBAGame } from "../schema/blueprints/INBAGame";
import { NBAGame } from "../schema/models/NBAGame";
import { INHLGame } from "../schema/blueprints/INHLGame";
import { NHLGame } from "../schema/models/NHLGame";
import { IMLBGame } from "../schema/blueprints/IMLBGame";
import { MLBGame } from "../schema/models/MLBGame";
import { IPreferences } from "../../../wiseDisplay-api/interfaces/IApiPreferences";
import { Util } from "../utils/Util";
import { SituationDAL } from "./SituationDAL.class";

const NFL_API_BASE_URL = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
const NBA_API_BASE_URL = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
const NHL_API_BASE_URL = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';
const MLB_API_BASE_URL = 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
export class GameDAL {
    public static async getNFLGames(preferences: IPreferences): Promise<NFLGame[]> {
        try {
        
            const response = await fetch(`${NFL_API_BASE_URL}${Util.getRequestParameters(preferences)}`, {method: 'GET'});
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();

            /**
             * The following code is temporary, it is here to save all the 
             * possible values returned from the ESPN NFL API so that we 
             * have a better understanding of what we can do. Once we save
             * all the id's we can remove this functionality.
             */
            try {
                await SituationDAL.saveNFLSituations(data);
            } catch(error) {
                console.log("Error saving situation data");
            }

            const league = data.leagues[0].abbreviation;
            const games: INFLGame[] = data.events.map((event: any) => {
                const info = event.competitions[0];
                const game: INFLGame = {
                    league: league,
                    name: event.shortName,
                    date: event.date,
                    hometeam: {
                        teamShortName: info.competitors[0].team.abbreviation, 
                        teamFullName: info.competitors[0].team.displayName,
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color ?? "", 
                        logo: info.competitors[0].team.logo, 
                        altcolor: info.competitors[0].team.alternateColor ?? "",
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamShortName: info.competitors[1].team.abbreviation, 
                        teamFullName: info.competitors[1].team.displayName,
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color ?? "", 
                        logo: info.competitors[1].team.logo, 
                        altcolor: info.competitors[1].team.alternateColor ?? "",
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    quarter: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail, 
                    halftime: info.status.type.name,
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    odds: {
                        details: info?.odds?.[0]?.details,
                        overUnder: info?.odds?.[0]?.overUnder,
                        spread: info?.odds?.[0]?.spread
                    },
                    homeTimeouts: info?.situation?.homeTimeouts ?? 0,
                    awayTimeouts: info?.situation?.awayTimeouts ?? 0,
                    down: info?.situation?.shortDownDistanceText, 
                    spot: info?.situation?.possessionText,
                    redzone: info?.situation?.isRedZone, 
                    possession: info?.situation?.possession,
                    lastPlayId: info?.situation?.lastPlay?.type?.id, 
                    lastPlayTeamId: info?.situation?.lastPlay?.team?.id,
                }
                return game;
            });
            return games.map(game => new NFLGame(game));
        } catch (error){
            console.log(error)
            return [];
        }
        
    }

    public static async getNBAGames(preferences: IPreferences): Promise<NBAGame[]> {
        try {
            const response = await fetch(`${NBA_API_BASE_URL}${Util.getRequestParameters(preferences)}`, {method: 'GET'});
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
                        teamShortName: info.competitors[0].team.abbreviation, 
                        teamFullName: info.competitors[0].team.displayName,
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color ?? "", 
                        logo: info.competitors[0].team.logo, 
                        altcolor: info.competitors[0].team.alternateColor ?? "",
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamShortName: info.competitors[1].team.abbreviation, 
                        teamFullName: info.competitors[1].team.displayName,
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color ?? "", 
                        logo: info.competitors[1].team.logo, 
                        altcolor: info.competitors[1].team.alternateColor ?? "",
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    quarter: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail,  
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    odds: {
                        details: info?.odds?.[0]?.details,
                        overUnder: info?.odds?.[0]?.overUnder,
                        spread: info?.odds?.[0]?.spread
                    }
                }
                return game;
            });
            return games.map(game => new NBAGame(game));
        } catch(error) {
            console.log(error)
            return[];
        }
    }

    public static async getNHLGames(preferences: IPreferences): Promise<NHLGame[]> {
        try {
            const response = await fetch(`${NHL_API_BASE_URL}${Util.getRequestParameters(preferences)}`, {method: 'GET'});
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
                        teamShortName: info.competitors[0].team.abbreviation, 
                        teamFullName: info.competitors[0].team.displayName,
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score), 
                        color: info.competitors[0].team.color ?? "", 
                        logo: info.competitors[0].team.logo, 
                        altcolor: info.competitors[0].team.alternateColor ?? "",
                        record: info.competitors[0].records?.[0]?.summary,
                    },
                    awayteam: {
                        teamShortName: info.competitors[1].team.abbreviation, 
                        teamFullName: info.competitors[1].team.displayName,
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color ?? "", 
                        logo: info.competitors[1].team.logo, 
                        altcolor: info.competitors[1].team.alternateColor ?? "",
                        record: info.competitors[1].records?.[0]?.summary,
                    },
                    time: info.status.displayClock, 
                    period: info.status.period, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail, 
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    odds: {
                        details: info?.odds?.[0]?.details,
                        overUnder: info?.odds?.[0]?.overUnder,
                        spread: info?.odds?.[0]?.spread
                    }
                }
                return game;
            });
            return games.map(game => new NHLGame(game));
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    public static async getMLBGames(preferences: IPreferences): Promise<MLBGame[]> {
        try {
            const response = await fetch(`${MLB_API_BASE_URL}${Util.getRequestParameters(preferences)}`, {method: 'GET'});
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
                        teamShortName: info.competitors[0].team.abbreviation, 
                        teamFullName: info.competitors[0].team.displayName,
                        id: info.competitors[0].id, 
                        score: Number(info.competitors[0].score),
                        color: info.competitors[0].team.color ?? "",
                        logo: info.competitors[0].team.logo,  
                        altcolor: info.competitors[0].team.alternateColor ?? "",
                        record: info?.competitors?.[0]?.records?.[0]?.summary, 
                    },
                    awayteam: {
                        teamShortName: info.competitors[1].team.abbreviation, 
                        teamFullName: info.competitors[1].team.displayName,
                        id: info.competitors[1].id, 
                        score: Number(info.competitors[1].score),
                        color: info.competitors[1].team.color ?? "", 
                        logo: info.competitors[1].team.logo, 
                        altcolor: info.competitors[1].team.alternateColor ?? "",
                        record: info?.competitors?.[1]?.records?.[0]?.summary, 
                    },
                    time: info.status.displayClock, 
                    inning: info.status.type.shortDetail, 
                    over: info.status.type.completed,
                    detail: info.status.type.detail,  
                    state: info.status.type.state,
                    isLive: info.status.type.state && info.status.type.state != 'pre' && info.status.type.state != 'post',
                    odds: {
                        details: info?.odds?.[0]?.details,
                        overUnder: info?.odds?.[0]?.overUnder,
                        spread: info?.odds?.[0]?.spread
                    },
                    outs: info?.situation?.outs,
                    strikes: info?.situation?.strikes,
                    balls: info?.situation?.balls,
                    onFirst: info?.situation?.onFirst,
                    onSecond: info?.situation?.onSecond,
                    onThird: info?.situation?.onThird,
                    batter: {
                        id: info?.situation?.batter?.athlete?.id,
                        teamId: info?.situation?.batter?.athlete?.team?.id,
                        headshot: info?.situation?.batter?.athlete?.headshot,
                        position: info?.situation?.batter?.athlete?.position,
                        shortName: info?.situation?.batter?.athlete?.shortName,
                        jerseyNumber: info?.situation?.batter?.athlete?.jersey,
                    },
                    pitcher: {
                        id: info?.situation?.pitcher?.athlete?.id,
                        teamId: info?.situation?.pitcher?.athlete?.team?.id,
                        headshot: info?.situation?.pitcher?.athlete?.headshot,
                        position: info?.situation?.pitcher?.athlete?.position,
                        shortName: info?.situation?.pitcher?.athlete?.shortName,
                        jerseyNumber: info?.situation?.pitcher?.athlete?.jersey,
                    },
                    dueUp: info?.situation?.dueUp?.map((player: any) => {
                        return {
                            id: player?.athlete?.id,
                            teamId: player?.athlete?.team?.id,
                            headshot: player?.athlete?.headshot,
                            position: player?.athlete?.position,
                            shortName: player?.athlete?.shortName,
                            jerseyNumber: player?.athlete?.jersey,
                        }
                    })
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