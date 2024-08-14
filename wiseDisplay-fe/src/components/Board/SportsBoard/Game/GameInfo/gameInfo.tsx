import React, { FunctionComponent } from 'react';

import './gameInfo.css';
import { IApiGame } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';
import NFLInfo from './NFLInfo/nflInfo';
import NHLInfo from './NHLInfo/nhlInfo';
import NBAInfo from './NBAInfo/nbaInfo';
import MLBInfo from './MLBInfo/mlbInfo';
import { BsDot } from 'react-icons/bs';


interface GameInfoData {
    gameData: IApiGame;
}

const GameInfo: FunctionComponent<GameInfoData> = ({ gameData }) => {
    const displayDate = (date: string): { day: string, time: string } => {
        const currentDate: Date = new Date();
        const timestamp = Date.parse(date);
        const eventDate = new Date(timestamp);

        const day = eventDate.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            month: 'short',
            day: 'numeric',
        });

        const time = eventDate.toLocaleTimeString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
                time,
            };
        } else {
            return {
                day,
                time,
            };
        }
    };

    if (gameData.isLive) {
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

    if (gameData.over) {
        return (
            <div className='game-info'>
                <span className='game-status'>{gameData.detail}</span>
            </div>
        );
    }

    return (
        <div className='game-info'>
            <span className='game-day'>{displayDate(gameData.date).day}</span>
            <span className='game-time'>{displayDate(gameData.date).time}</span>
            {(gameData.odds.details && gameData.odds.overUnder !== undefined) &&
                <div className="gameOdds">
                    <span className="oddsDetails">{gameData.odds.details}</span>
                    <BsDot className='oddsDivider' />
                    <span className="oddsOverUnder">{`O/U ${gameData.odds.overUnder}`}</span>
                </div>
            }
        </div>
    );
}

export default GameInfo;