import { Game } from "../schema/models/Game";
import { IConfig } from "../schema/blueprints/IConfig";
import { IApiGames, IApiGame, IApiGameInfo } from "../../../wiseDisplay-api/interfaces/IApiGames";
import { NFLGame } from "../schema/models/NFLGame";
import { NBAGame } from "../schema/models/NBAGame";
import { NHLGame } from "../schema/models/NHLGame";
import { MLBGame } from "../schema/models/MLBGame";

export const IApiGameAdapter = (games: Game[], config: IConfig): IApiGames => {
    const preferredTeamsLive: boolean = games
        .filter(game => game.includesFav(config.favTeams))
        .some(game => game.isLive);

    const filteredGames: IApiGame[] = games
        .filter(game => config.liveOnly && preferredTeamsLive ? game.isLive : true)
        .filter(game => config.leagues.includes(game.league))
        .filter(game => config.favTeamsOnly ? game.includesFav(config.favTeams) : true)
        .map(game =>({
            league: game.league,
            name: game.name,
            date: game.displayDate,
            hometeam: {
                teamName: game.hometeam.teamName,
                id: game.hometeam.id,
                score: game.hometeam.score,
                color: game.hometeam.color,
                altcolor: game.hometeam.altcolor,
                record: game.hometeam.record
            },
            awayteam:{
                teamName: game.awayteam.teamName,
                id: game.awayteam.id,
                score: game.awayteam.score,
                color: game.awayteam.color,
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
            quarter: game.quarter
        }
    }
    else if(game instanceof NHLGame) {
        return { 
            period: game.period 
        }
    }
}