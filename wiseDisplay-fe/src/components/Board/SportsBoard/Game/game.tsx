import React, { FunctionComponent } from "react";
import { IApiGame } from "../../../../../../wiseDisplay-api/interfaces/IApiGames";

import "./game.css"
import { ITeam } from "../../../../../../wiseDisplay-be/src/schema/blueprints/IGame";
import GameInfo from "./GameInfo/gameInfo";

interface GameInfoData {
    gameData: IApiGame;
}

interface TeamData {
    teamData: ITeam;
}

const Game: FunctionComponent<GameInfoData> = ({ gameData }) => {
    const awayTeamColor = getMostDifferentColor(
        gameData.hometeam.color,
        gameData.awayteam.color,
        gameData.awayteam.altcolor
    );

    return (
        <div className="gameCard">
            <div className="gameHeader">
                <div className="gameColorBar">
                    <div 
                        className="awayTeamColor teamColor" 
                        style={{backgroundColor: `#${awayTeamColor ? awayTeamColor : 'e8efec'}`}}>
                    </div>
                    <div 
                        className="homeTeamColor teamColor" 
                        style={{backgroundColor: `#${gameData.hometeam.color ? gameData.hometeam.color : 'e8efec'}`}}>
                    </div>
                </div>
            </div>
            <div className="gameSummary">
                <div className="gameMatchup">
                    <Team teamData={gameData.awayteam} />
                    <GameInfo gameData={gameData} />
                    <Team teamData={gameData.hometeam} />
                </div>
                <div className="gameOdds">

                </div>
            </div>
        </div>
    );
}

export default Game;


const Team: FunctionComponent<TeamData> = ({ teamData }) => (
    <div className='team'>
        <div className="teamLogoWrapper">
            <img className="teamLogo" src={teamData.logo} alt="teamLogo" />
        </div>
        <div className="teamNameWrapper">
            <span className="teamName">{teamData.teamShortName}</span>
        </div>
        {true ? (
            <div className='teamRecordWrapper'>
                <span className="teamRecord">{teamData.record}</span>
            </div>
        ) : (
            <>
                <div className='scoreWrapper'>
                    <span className="score">{teamData.score}</span>
                </div>
            </>
        )}

    </div>
);

function getMostDifferentColor(mainColor: string, color1: string, color2: string): string {
    if(!mainColor || !color1 || !color2) return "";
    
    mainColor = mainColor.replace('#', '');
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');

    const mainRGB = hexToRGB(mainColor);
    const color1RGB = hexToRGB(color1);
    const color2RGB = hexToRGB(color2);

    const diff1 = colorDiff(mainRGB, color1RGB);
    const diff2 = colorDiff(mainRGB, color2RGB);

    return diff1 > diff2 ? color1 : color2;
}

function hexToRGB(color: string) {
    return [
        parseInt(color.substr(0, 2), 16),
        parseInt(color.substr(2, 2), 16),
        parseInt(color.substr(4, 2), 16)
    ];
}

function colorDiff(mainRGB: number[], compareRGB: number[]) {
    return Math.sqrt(
        Math.pow(mainRGB[0] - compareRGB[0], 2) +
        Math.pow(mainRGB[1] - compareRGB[1], 2) +
        Math.pow(mainRGB[2] - compareRGB[2], 2)
    );
}