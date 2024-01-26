import React, { FunctionComponent } from 'react';

import { IApiGame } from '../../../../../../wiseDisplay-api/interfaces/IApiGames';
import './preGame.css';

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
                    <img className='team-logo' src={gameData.awayteam.logo} alt='away-team-logo' />
                    <div className='team-info'>
                        <p className='team-name'>{gameData.awayteam.teamFullName}</p>
                        <p className='team-record'>{gameData.awayteam.record}</p>
                    </div>
                </div>
                <div className='home-team' style={{ backgroundColor: `#${gameData.hometeam.color}` }}>
                    <img className='team-logo' src={gameData.hometeam.logo} alt='home-team-logo' />
                    <div className='team-info'>
                        <p className='team-name'>{gameData.hometeam.teamFullName}</p>
                        <p className='team-record'>{gameData.hometeam.record}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreGame;