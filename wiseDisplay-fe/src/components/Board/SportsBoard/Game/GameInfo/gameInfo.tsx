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
    const displayDate = (date: string): { day: string, time: string } => {
        const currentDate: Date = new Date();
        const timestamp = Date.parse(date);
        const eventDate = new Date(timestamp);
    
        const eventDateString = eventDate.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    
        if (
            eventDate.getFullYear() === currentDate.getFullYear() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getDate() === currentDate.getDate()
        ) {
            return {
                day: 'TODAY',
                time: eventDateString.split(', ')[1] // Extract time
            };
        } else {
            const [day, time] = eventDateString.split(', ');
            return {
                day,
                time
            };
        }
    }
    if (gameData.state === 'pre') {
        return (
            <div className='game-info'>
                <p className='game-day'>{displayDate(gameData.date).day}</p>
                <p className='game-time'>{displayDate(gameData.date).time}</p>
            </div>
        );
    }

    if (gameData.state === 'post') {
        return (
            <div className='game-info'>
                <p className='game-status'>{gameData.detail}</p>
                <p className='game-day'>{displayDate(gameData.date).day}</p>
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