import { Game } from "../schema/models/Game";
import { IPreferences } from "../../../wiseDisplay-api/interfaces/IApiPreferences";
import { IApiGames, IApiGame, IApiGameInfo } from "../../../wiseDisplay-api/interfaces/IApiGames";
import { NFLGame } from "../schema/models/NFLGame";
import { NBAGame } from "../schema/models/NBAGame";
import { NHLGame } from "../schema/models/NHLGame";
import { MLBGame } from "../schema/models/MLBGame";

export const IApiGameAdapter = (games: Game[], preferences: IPreferences): IApiGames => {

    const preferredTeamsLive: boolean = games
        .filter(game => game.includesFav(preferences.favTeams))
        .some(game => game.isLive);
        
    const anyGamesLive: boolean = games
    .filter(game => preferences.leagues.includes(game.league))
    .some(game => game.isLive);

    const filteredGames: IApiGame[] = games
        .filter(game => (preferences.liveOnly && anyGamesLive) ? game.isLive : true)
        .filter(game => preferences.leagues.includes(game.league))
        .filter(game => (preferences.favTeamsOnly && preferredTeamsLive) ? game.includesFav(preferences.favTeams) && game.isLive : true)
        .map(game =>({
            league: game.league,
            name: game.name,
            date: game.date,
            hometeam: {
                teamShortName: game.hometeam.teamShortName,
                teamFullName: game.hometeam.teamFullName,
                id: game.hometeam.id,
                score: game.hometeam.score,
                color: game.hometeam.color,
                logo: game.hometeam.logo,
                altcolor: game.hometeam.altcolor,
                record: game.hometeam.record
            },
            awayteam:{
                teamShortName: game.awayteam.teamShortName,
                teamFullName: game.awayteam.teamFullName,
                id: game.awayteam.id,
                score: game.awayteam.score,
                color: game.awayteam.color,
                logo: game.awayteam.logo,
                altcolor: game.awayteam.altcolor,
                record: game.awayteam.record
            },
            time: game.time,
            over: game.over,
            detail: game.detail,
            state: game.state,
            isLive: game.isLive,
            halftime: game.halftime,
            gameInfo: IApiGameInfoAdapter(game),          
        }));

    return {
        preferredTeamsLive,
        filteredGames
    };
};


const IApiGameInfoAdapter = (game: Game): IApiGameInfo => {
    if(game instanceof NFLGame) {
        return {
            quarter: game.displayQuarter,
            possession: game.possession,
            redzone: game.redzone,
            down: game.down, 
            spot: game.spot,
            awayTimeouts: game.awayTimeouts,
            homeTimeouts: game.homeTimeouts
        }
    } 
    else if(game instanceof MLBGame) {
        return {
            inning: game.inning,
            outs: game.outs,
            strikes: game.strikes,
            balls: game.balls,
            onFirst: game.onFirst,
            onSecond: game.onSecond,
            onThird: game.onThird
        }
    }
    else if(game instanceof NBAGame) {
        return {
            quarter: game.displayQuarter
        }
    }
    else if(game instanceof NHLGame) {
        return { 
            period: game.displayPeriod 
        }
    }
}