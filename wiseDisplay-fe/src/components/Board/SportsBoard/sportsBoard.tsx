import './sportsBoard.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IApiGames } from '../../../../../wiseDisplay-api/interfaces/IApiGames';
import GameInfo from './Game/GameInfo/gameInfo';
import Matchup from './Game/matchup';

const SportsBoard = () => {
    const [gameData, setGameData] = useState<IApiGames>({
        preferredTeamsLive: false,
        filteredGames: [],
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const preloadImages = (urls: string[]) => {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://wisedisplay-be.onrender.com/api/games/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        liveOnly: true,
                        favTeamsOnly: false,
                        favTeams: [],
                        leagues: ["NHL", "NFL", "NBA"],
                    }),
                });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: IApiGames = await response.json();
            setGameData(data);
            preloadImages(data.filteredGames.map(game => game.awayteam.logo));
            preloadImages(data.filteredGames.map(game => game.hometeam.logo));  
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % gameData.filteredGames.length;
                    if (nextIndex === 0) {
                        fetchData();
                    }
                    return nextIndex;
                });
            }, 10000);
        };

        const stopInterval = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
              }
        };

        fetchData();

        if (gameData.filteredGames.length > 0 && !loading) {
            startInterval();
        }

        return () => {
            stopInterval();
        };
    }, [fetchData, gameData.filteredGames.length, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <GameInfo gameData={gameData.filteredGames[currentIndex]}/>
            <Matchup gameData={gameData.filteredGames[currentIndex]}/>
        </>
    );
};

export default SportsBoard;

