import React, { FunctionComponent } from 'react';

import '../sportsBoard.css';
import { IApiGame } from '../../../../../../wiseDisplay-api/interfaces/IApiGames';
import { ITeam } from '../../../../../../wiseDisplay-be/src/schema/blueprints/IGame';


interface MatchupData {
    gameData: IApiGame;
}

interface TeamProps {
    team: ITeam;
    backgroundColor?: string;
    textColor: string;
    state: string;
}

function getContrastingTextColor(backgroundColor: string): string {

    backgroundColor = backgroundColor.replace('#', '');

    const r = parseInt(backgroundColor.substr(0, 2), 16);
    const g = parseInt(backgroundColor.substr(2, 2), 16);
    const b = parseInt(backgroundColor.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function getMostDifferentColor(mainColor: string, color1: string, color2: string): string {

    mainColor = mainColor.replace('#', '');
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');

    const mainRGB = [
        parseInt(mainColor.substr(0, 2), 16),
        parseInt(mainColor.substr(2, 2), 16),
        parseInt(mainColor.substr(4, 2), 16)
    ];
    const color1RGB = [
        parseInt(color1.substr(0, 2), 16),
        parseInt(color1.substr(2, 2), 16),
        parseInt(color1.substr(4, 2), 16)
    ];
    const color2RGB = [
        parseInt(color2.substr(0, 2), 16),
        parseInt(color2.substr(2, 2), 16),
        parseInt(color2.substr(4, 2), 16)
    ];

    const diff1 = Math.sqrt(
        Math.pow(mainRGB[0] - color1RGB[0], 2) +
        Math.pow(mainRGB[1] - color1RGB[1], 2) +
        Math.pow(mainRGB[2] - color1RGB[2], 2)
    );
    const diff2 = Math.sqrt(
        Math.pow(mainRGB[0] - color2RGB[0], 2) +
        Math.pow(mainRGB[1] - color2RGB[1], 2) +
        Math.pow(mainRGB[2] - color2RGB[2], 2)
    );

    return diff1 > diff2 ? color1 : color2;
}

const Matchup: FunctionComponent<MatchupData> = ({ gameData }) => {

    const awayTeamColor = getMostDifferentColor(
        gameData.hometeam.color, 
        gameData.awayteam.color, 
        gameData.awayteam.altcolor
    );

    return (
        <div className='matchup-info'>
            <Team
                team={gameData.awayteam}
                backgroundColor={`#${awayTeamColor}`}
                textColor={getContrastingTextColor(awayTeamColor)}
                state={gameData.state}
            />
            <Team
                team={gameData.hometeam}
                backgroundColor={`#${gameData.hometeam.color}`}
                textColor={getContrastingTextColor(gameData.hometeam.color)}
                state={gameData.state}
            />
        </div>
    )
}

export default Matchup;


const Team: FunctionComponent<TeamProps> = ({ team, backgroundColor, textColor, state }) => (
    <div className='team' style={{ backgroundColor }}>
        <div className='team-logo-wrapper'>
            <img className='team-logo' src={team.logo} alt={`${team.teamShortName}-logo`} />
        </div>
        <TeamInfo team={team} textColor={textColor} state={state} />
    </div>
);

const TeamInfo: FunctionComponent<TeamProps> = ({ team, textColor, state }) => (
    <div className='team-info'>
        <p className='team-name' style={{ color: textColor }}>
            {team.teamShortName}
        </p>
        {state === 'pre' ? (
            <p className='team-record' style={{ color: textColor }}>
                {team.record}
            </p>
        ) : (
            <p className='score' style={{ color: textColor }}>
                {team.score}
            </p>
        )}
    </div>
);