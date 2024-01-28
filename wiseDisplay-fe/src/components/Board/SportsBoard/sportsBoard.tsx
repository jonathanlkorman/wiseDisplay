import './sportsBoard.css';
import React, { useState, useEffect, useRef } from 'react';
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

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/games/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        liveOnly: true,
                        favTeamsOnly: false,
                        favTeams: ["NYJ", "NYI", "NYM"],
                        leagues: ["NHL", "NFL", "NBA"],
                    }),
                });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: IApiGames = await response.json();
            setGameData(data);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                // Move to the next game or loop back to the first game
                setCurrentIndex((prevIndex) => (prevIndex + 1) % gameData.filteredGames.length);
            }, 10000); // 10 seconds interval
        };

        const stopInterval = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
              }
        };

        // Initial fetch on page load
        fetchData();

        // Start the interval when gameData is available and not loading
        if (gameData.filteredGames.length > 0 && !loading) {
            startInterval();
        }

        // Cleanup function to clear the interval if the component is unmounted
        return () => {
            stopInterval();
        };
    }, [gameData.filteredGames.length, loading]); // Include gameData.length and loading as dependencies

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

