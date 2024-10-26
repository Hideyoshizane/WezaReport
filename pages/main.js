import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WeatherFetcher from '../src/components/WeatherFetch/WeatherFetch';

import '../styles/globals.css'; // Import the global CSS file

export default function Main() {
	const router = useRouter();
	const { latitude: queryLatitude, longitude: queryLongitude } = router.query;

	// State to store fetched coordinates and weather data
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Update location when query parameters change
	useEffect(() => {
		if (queryLatitude && queryLongitude) {
			setLocation({
				latitude: queryLatitude,
				longitude: queryLongitude,
			});
		}
	}, [queryLatitude, queryLongitude]);

	const handleFetch = (data) => {
		setWeatherData(data);
		setLoading(false); // Set loading to false once data is fetched
	};

	return (
		<div>
			{loading ? (
				<p>Loading weather data...</p>
			) : (
				<>
					<p>Latitude: {location.latitude || queryLatitude}</p>
					<p>Longitude: {location.longitude || queryLongitude}</p>
					{/* Render weather data here */}
					{weatherData && (
						<div>
							<h2>Current Weather Data</h2>
							<pre>{JSON.stringify(weatherData.current, null, 2)}</pre>

							<h2>Hourly Weather Data</h2>
							<pre>{JSON.stringify(weatherData.hourly, null, 2)}</pre>

							<h2>Daily Weather Data</h2>
							<pre>{JSON.stringify(weatherData.daily, null, 2)}</pre>
						</div>
					)}
				</>
			)}
			<WeatherFetcher
				latitude={location.latitude || queryLatitude}
				longitude={location.longitude || queryLongitude}
				onFetch={handleFetch}
			/>
		</div>
	);
}
