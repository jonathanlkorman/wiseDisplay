import React, { FunctionComponent } from "react";
import { IApiGame } from "../../../../../../wiseDisplay-api/interfaces/IApiGames";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

import "./game.css"
import { ITeam } from "../../../../../../wiseDisplay-be/src/schema/blueprints/IGame";
import GameInfo from "./GameInfo/gameInfo";
import { useTheme } from "../../../../context/themeContext";

interface GameInfoData {
    gameData: IApiGame;
}

interface TeamData {
    teamData: ITeam;
    state: string;
    teamIndicator: string;
    winner: boolean;
}

const Game: FunctionComponent<GameInfoData> = ({ gameData }) => {
    const awayTeamColor = getMostDifferentColor(
        gameData.hometeam.color,
        gameData.awayteam.color,
        gameData.awayteam.altcolor
    );

    return (
        <div className="game-card">
            <div className="game-header">
                <div className="game-color-bar">
                    <div
                        className="team-color team-color-away"
                        style={{ backgroundColor: `#${awayTeamColor ? awayTeamColor : 'e8efec'}` }}>
                    </div>
                    <div
                        className="team-color team-color-home"
                        style={{ backgroundColor: `#${gameData.hometeam.color ? gameData.hometeam.color : 'e8efec'}` }}>
                    </div>
                </div>
            </div>
            <div className="game-summary">
                <div className="game-matchup">
                    <Team
                        teamData={gameData.awayteam}
                        state={gameData.state}
                        teamIndicator="awayTeam"
                        winner={gameData.awayteam.score > gameData.hometeam.score}
                    />
                    <GameInfo gameData={gameData} />
                    <Team
                        teamData={gameData.hometeam}
                        state={gameData.state}
                        teamIndicator="homeTeam"
                        winner={gameData.hometeam.score > gameData.awayteam.score}
                    />
                </div>
            </div>
        </div>
    );
}

export default Game;


const Team: FunctionComponent<TeamData> = ({ teamData, state, teamIndicator, winner }) => {
    const { theme } = useTheme();
    return (
        <div className={`team ${teamIndicator}`}>
            <div className="team-name-wrapper">
                <span className="team-name">{teamData.teamShortName}</span>
            </div>
            <div className="team-logo-wrapper">
                <img className={`team-logo ${theme}`} src={teamData.logo} alt="team-logo" />
            </div>

            {state === 'pre' ?
                <div className='team-record-wrapper'>
                    <span className="team-record">{teamData.record}</span>
                </div>
                :
                <div className={`score-wrapper score${teamIndicator}`}>
                    <span className="score">{teamData.score}</span>
                </div>
            }
            {state === "post" && winner && (
                teamIndicator === "awayTeam"
                    ? <BsCaretLeftFill className="caret caret-away" />
                    : <BsCaretRightFill className="caret caret-home" />
            )}
        </div>
    )
};

function getMostDifferentColor(mainColor: string, color1: string, color2: string): string {
    if (!mainColor || !color1 || !color2) return "";

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