import React, { FunctionComponent } from 'react';

import { IApiGame } from '../../../../../../wiseDisplay-api/interfaces/IApiGames';
import '../sportsBoard.css';

interface PreGameData {
    gameData: IApiGame;
}

const PreGame: FunctionComponent<PreGameData> = ({ gameData }) => {

    return (
        <>
            <div className='game-info'>
                <p className='game-day'>{gameData.date.day}</p>
                <p className='game-time'>{gameData.date.time}</p>
            </div>
            <div className='matchup-info'>
                <div className='away-team' style={{ backgroundColor: `#${gameData.awayteam.altcolor}` }}>
                    <div className='team-logo-wrapper'>
                        <img className='team-logo' src={gameData.awayteam.logo} alt='away-team-logo' />
                    </div>
                    <div className='team-info'>
                        <p className='team-name'>{gameData.awayteam.teamShortName}</p>
                        <p className='team-record'>{gameData.awayteam.record}</p>
                    </div>
                </div>
                <div className='home-team' style={{ backgroundColor: `#${gameData.hometeam.color}` }}>
                <div className='team-logo-wrapper'>
                        <img className='team-logo' src={gameData.hometeam.logo} alt='home-team-logo' />
                    </div>
                    <div className='team-info'>
                        <p className='team-name'>{gameData.hometeam.teamShortName}</p>
                        <p className='team-record'>{gameData.hometeam.record}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreGame;