import React, { useState, useEffect, useRef, useCallback, FunctionComponent } from 'react';
import { IApiGames } from '../../../../../wiseDisplay-api/interfaces/IApiGames';
import { IPreferences } from '../../../../../wiseDisplay-api/interfaces/IApiPreferences';
import Game from './Game/game';
import GameLoadingScreen from './Game/LoadingScreen/gameLoadingScreen';

interface SportsBoardProps {
    preferences: any
}

const SportsBoard: FunctionComponent<SportsBoardProps> = ({ preferences }) => {
    const [gameData, setGameData] = useState<IApiGames>({
        preferredTeamsLive: false,
        filteredGames: [],
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const retryRef = useRef<NodeJS.Timeout | null>(null);

    const preloadImages = (urls: string[]) => {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    const formatRequestBody = (preferences: any): IPreferences => {
        return {
            liveOnly: preferences.liveOnly,
            favTeamsOnly: preferences.favTeamsOnly,
            leagues: preferences.leagues.map(
                (option: { value: string, label: string }) => option.value),
            favTeams: preferences.favTeams.map(
                (option: { value: string, label: string }) => option.value)
        }

    }

    const fetchData = useCallback(async () => {
        try {

            const body = formatRequestBody(preferences);
            const response = await fetch('https://wisedisplay-be.onrender.com/api/games/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: IApiGames = await response.json();
            setGameData(data);
            preloadImages(data.filteredGames.map(game => game.awayteam.logo));
            preloadImages(data.filteredGames.map(game => game.hometeam.logo));
            setLoading(false);
            
            if (retryRef.current !== null) {
                clearTimeout(retryRef.current as NodeJS.Timeout);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            retryRef.current = setTimeout(() => {
                fetchData();
            }, 30000);
        }
    }, [preferences]);

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
        return <GameLoadingScreen />
    }
    if (gameData.filteredGames.length <= 0) {
        return <p className='no-data'>No Games</p>;
    }

    return (
        <Game gameData={gameData.filteredGames[currentIndex]} />
    );
};

export default SportsBoard;

