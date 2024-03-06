import React, { useState, useEffect } from 'react';
import Game from './Game/game';
import GameLoadingScreen from './Game/LoadingScreen/gameLoadingScreen';
import useFetchGameData from '../../../hooks/useFetchGameData';

interface SportsBoardProps {
	preferences: any;
}

const SportsBoard: React.FC<SportsBoardProps> = ({ preferences }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { gameData, loading, fetchGameData } = useFetchGameData(preferences);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		const startInterval = () => {
			intervalId = setInterval(() => {
				setCurrentIndex((prevIndex) => {
					const nextIndex = (prevIndex + 1) % gameData.filteredGames.length;
					if (nextIndex === 0) {
						fetchGameData();
					}
					return nextIndex;
				});
			}, 10000);
		};

		const stopInterval = () => {
			if (intervalId !== null) {
				clearInterval(intervalId);
			}
		};

		fetchGameData();

		if (gameData.filteredGames.length > 0 && !loading) {
			startInterval();
		}

		return stopInterval;
	}, [fetchGameData, gameData.filteredGames.length, loading]);

	if (loading) {
		return <GameLoadingScreen />;
	}

	if (gameData.filteredGames.length <= 0) {
		return <p className="no-data">No Games</p>;
	}

	return <Game gameData={gameData.filteredGames[currentIndex]} />;
};

export default SportsBoard;