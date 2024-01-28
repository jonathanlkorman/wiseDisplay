import React, { FunctionComponent } from 'react';

import '../../sportsBoard.css';
import { IApiGame } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';
import NFLInfo from './nflInfo';
import NHLInfo from './nhlInfo';
import NBAInfo from './nbaInfo';
import MLBInfo from './mlbInfo';


interface GameInfoData {
    gameData: IApiGame;
}

const GameInfo: FunctionComponent<GameInfoData> = ({ gameData }) => {
    if (gameData.state === 'pre') {
        return (
            <div className='game-info'>
                <p className='game-day'>{gameData.date.day}</p>
                <p className='game-time'>{gameData.date.time}</p>
            </div>
        );
    }

    if (gameData.state === 'post') {
        return (
            <div className='game-info'>
                <p className='game-status'>{gameData.detail}</p>
                <p className='game-day'>{gameData.date.day}</p>
            </div>
        );
    }

    switch (gameData.league) {
        case 'NFL':
            return <NFLInfo gameData={gameData} />;
        case 'NHL':
            return <NHLInfo gameData={gameData} />;
        case 'NBA':
            return <NBAInfo gameData={gameData} />;
        case 'MLB':
            return <MLBInfo gameData={gameData} />;
        default:
            return null;
    }
}

export default GameInfo;