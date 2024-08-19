import { Game } from "../schema/models/Game";
import { IPreferences } from "../../../wiseDisplay-api/interfaces/IApiPreferences";
import { IApiGames, IApiGame, IApiGameInfo, IApiNFLPlay } from "../../../wiseDisplay-api/interfaces/IApiGames";
import { NFLGame } from "../schema/models/NFLGame";
import { NBAGame } from "../schema/models/NBAGame";
import { NHLGame } from "../schema/models/NHLGame";
import { MLBGame } from "../schema/models/MLBGame";
import { ESPN_NFL_PLAY } from "../schema/blueprints/INFLGame";
import { NFL_PLAY } from "../../../wiseDisplay-api/interfaces/IApiNFLPlay";

export const IApiGameAdapter = (games: Game[], preferences: IPreferences): IApiGames => {

    const preferredTeamsLive: boolean = games
        .filter(game => game.includesFav(preferences.favTeams))
        .some(game => game.isLive);

    const anyGamesLive: boolean = games
        .filter(game => preferences.leagues.includes(game.league) || game.includesFav(preferences.favTeams))
        .some(game => game.isLive);

    const filteredGames: IApiGame[] = games
        .filter(game => (preferences.liveOnly && anyGamesLive) ? game.isLive : true)
        .filter(game => preferences.leagues.includes(game.league) || game.includesFav(preferences.favTeams))
        .filter(game => (preferences.favTeamsOnly && preferredTeamsLive) ? game.includesFav(preferences.favTeams) && game.isLive : true)
        .map(game => ({
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
            awayteam: {
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
            odds: {
                details: game.odds.details,
                overUnder: game.odds.overUnder,
                spread: game.odds.spread
            },
            halftime: game.halftime,
            gameInfo: IApiGameInfoAdapter(game),
        }));

    return {
        preferredTeamsLive,
        filteredGames
    };
};


const IApiGameInfoAdapter = (game: Game): IApiGameInfo => {
    if (game instanceof NFLGame) {
        return {
            quarter: game.displayQuarter,
            possession: game.possession,
            redzone: game.redzone,
            down: game.down,
            spot: game.spot,
            awayTimeouts: game.awayTimeouts,
            homeTimeouts: game.homeTimeouts,
            lastPlay: adaptNFLPlay(game.lastPlayId, game.lastPlayTeam),
        }
    }
    else if (game instanceof MLBGame) {
        return {
            inning: game.inning,
            outs: game.outs,
            strikes: game.strikes,
            balls: game.balls,
            onFirst: game.onFirst,
            onSecond: game.onSecond,
            onThird: game.onThird,
            pitcher: {
                id: game.pitcher.id,
                teamId: game.pitcher.teamId,
                shortName: game.pitcher.shortName,
                position: game.pitcher.position,
                headshot: game.pitcher.headshot,
                jerseyNumber: game.pitcher.jerseyNumber
            },
            batter: {
                id: game.batter.id,
                teamId: game.batter.teamId,
                shortName: game.batter.shortName,
                position: game.batter.position,
                headshot: game.batter.headshot,
                jerseyNumber: game.batter.jerseyNumber
            },
            dueUp: game?.dueUp?.map(player => {
                return {
                    id: player.id,
                    teamId: player.teamId,
                    shortName: player.shortName,
                    position: player.position,
                    headshot: player.headshot,
                    jerseyNumber: player.jerseyNumber
                }
            })
        }
    }
    else if (game instanceof NBAGame) {
        return {
            quarter: game.displayQuarter
        }
    }
    else if (game instanceof NHLGame) {
        return {
            period: game.displayPeriod
        }
    }
}

const adaptNFLPlay = (lastPlayId: string, lastPlayTeam: string): IApiNFLPlay => {
    switch (lastPlayId) {
        case ESPN_NFL_PLAY.PASSING_TOUCHDOWN:
        case ESPN_NFL_PLAY.RUSHING_TOUCHDOWN:
        case ESPN_NFL_PLAY.INTERCEPTION_RETURN_TOUCHDOWN:
            return {
                type: NFL_PLAY.TOUCHDOWN,
                teamId: lastPlayTeam
            };
        case ESPN_NFL_PLAY.EXTRA_POINT_GOOD:
            return {
                type: NFL_PLAY.EXTRA_POINT_GOOD,
                teamId: lastPlayTeam
            };
        case ESPN_NFL_PLAY.EXTRA_POINT_MISSED:
            return {
                type: NFL_PLAY.EXTRA_POINT_MISSED,
                teamId: lastPlayTeam
            };
        case ESPN_NFL_PLAY.FIELD_GOAL_GOOD:
            return {
                type: NFL_PLAY.FIELD_GOAL_GOOD,
                teamId: lastPlayTeam
            };
        case ESPN_NFL_PLAY.FIELD_GOAL_MISSED:
            return {
                type: NFL_PLAY.FIELD_GOAL_MISSED,
                teamId: lastPlayTeam
            };
        case ESPN_NFL_PLAY.SAFETY:
            return {
                type: NFL_PLAY.SAFETY,
                teamId: lastPlayTeam
            };
        default:
            return null;
    }
}