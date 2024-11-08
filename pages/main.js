import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
			setLoading(true); // Reset loading state when location changes
		}
	}, [queryLatitude, queryLongitude]);

	const handleFetch = (data) => {
		setWeatherData(data);
		setLoading(false); // Set loading to false once data is fetched
	};

	// Inline styles for overflow container
	const overflowContainerStyle = {
		maxHeight: '400px', // Set a max height to control how much is visible
		overflowY: 'auto', // Allow vertical scrolling
		padding: '10px', // Add some padding for aesthetics
		border: '1px solid #ccc', // Optional: add a border
		backgroundColor: '#f9f9f9', // Optional: background color
	};

	return (
		<div>
			{loading ? (
				<p>Loading weather data...</p>
			) : (
				<>
					<p>Latitude: {location.latitude || queryLatitude}</p>
					<p>Longitude: {location.longitude || queryLongitude}</p>
					{weatherData && (
						<div>
							<h2>Current Weather Data</h2>
							<div style={overflowContainerStyle}>
								<pre>{JSON.stringify(weatherData.weather.current, null, 2)}</pre>
							</div>
							<h2>Daily Weather Data</h2>
							<div style={overflowContainerStyle}>
								<pre>{JSON.stringify(weatherData.weather.daily, null, 2)}</pre>
							</div>
							<h2>Hourly Weather Data</h2>
							<div style={overflowContainerStyle}>
								<pre>{JSON.stringify(weatherData.weather.hourly, null, 2)}</pre>
							</div>
							<h2>Current Air Quality Data</h2>
							<div style={overflowContainerStyle}>
								<pre>{JSON.stringify(weatherData.airQuality.current, null, 2)}</pre>
							</div>
							<h2>Hourly Air Quality Data</h2>
							<div style={overflowContainerStyle}>
								<pre>{JSON.stringify(weatherData.airQuality.hourly, null, 2)}</pre>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
