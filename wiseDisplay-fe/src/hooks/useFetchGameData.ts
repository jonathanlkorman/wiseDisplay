import { useState, useRef, useCallback } from 'react';
import { IApiGames } from '../../../wiseDisplay-api/interfaces/IApiGames';
import { IPreferences } from '../../../wiseDisplay-api/interfaces/IApiPreferences';

const useFetchGameData = (preferences: any) => {
	const [gameData, setGameData] = useState<IApiGames>({
		preferredTeamsLive: false,
		filteredGames: [],
	});
	const [loading, setLoading] = useState(true);
	const retryRef = useRef<NodeJS.Timeout | null>(null);

	const preloadImages = (urls: string[]) => {
		return Promise.all(urls.map((url) => new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = resolve;
			img.onerror = reject;
			img.src = url;
		})));
	};

	const formatRequestBody = ({ liveOnly, favTeamsOnly, leagues, favTeams, dailyOnly }: any): IPreferences => {
		return {
			liveOnly,
			favTeamsOnly,
			leagues: leagues.map(({ value }: { value: string, label: string }) => value),
			favTeams: favTeams.map(({ value }: { value: string, label: string }) => value),
			dailyOnly,
			datetime: new Date().toDateString(),
		};
	};

	const fetchGameData = useCallback(async () => {
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
				fetchGameData();
			}, 30000);
		}
	}, [preferences]);

	return { gameData, loading, fetchGameData };
};

export default useFetchGameData;