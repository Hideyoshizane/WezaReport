import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Card from '@/components/Card/Card';
import BackgroundImage from '@/components/BackgroundImage/BackgroundImage';

import '../styles/globals.css';

import AirQualityPlaceholder from '../Airquality.json';
import WeatherPlaceholder from '../placeholder.json';

export default function Main() {
	const router = useRouter();
	const { latitude: queryLatitude, longitude: queryLongitude } = router.query;

	const [coordinates, setCoordinates] = useState({
		latitude: null, // Default to null
		longitude: null, // Default to null
	});

	const [darkMode, setDarkMode] = useState(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('darkMode')) || true;
		}
		return true; // default value
	});

	const [usaMode, setUsaMode] = useState(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('usaMode')) || false;
		}
		return false; // default value
	});

	const [weatherData, setWeatherData] = useState(null);
	const [airQualityData, setAirQualityData] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	// Fetch weather and air quality data based on latitude and longitude
	const fetchWeatherAndAirQualityData = async (lat, lon) => {
		const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;
		const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto&forecast_days=1`;

		try {
			setIsFetching(true);
			const weatherResponse = await fetch(weatherUrl);
			const airQualityResponse = await fetch(airQualityUrl);

			if (!weatherResponse.ok || !airQualityResponse.ok) {
				throw new Error('Failed to fetch data');
			}

			const weatherData = await weatherResponse.json();
			const airQualityData = await airQualityResponse.json();

			setWeatherData(weatherData);
			setAirQualityData(airQualityData);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (queryLatitude && queryLongitude) {
			let lat = parseFloat(queryLatitude);
			let lon = parseFloat(queryLongitude);

			// Set latitude and longitude only if they are valid
			if (!isNaN(lat) && !isNaN(lon)) {
				setCoordinates({ latitude: lat, longitude: lon });
			} else {
				console.log('Invalid latitude or longitude in query');
			}
		}
	}, [queryLatitude, queryLongitude]);

	// Fetch data when latitude or longitude changes, and they're valid
	useEffect(() => {
		if (coordinates.latitude !== null && coordinates.longitude !== null) {
			fetchWeatherAndAirQualityData(coordinates.latitude, coordinates.longitude);
		} else {
			console.log('Latitude or longitude is not set correctly');
		}
	}, [coordinates]); // Trigger when coordinates change

	// Update localStorage when darkMode or usaMode changes
	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);

	useEffect(() => {
		localStorage.setItem('usaMode', JSON.stringify(usaMode));
	}, [usaMode]);

	const handleDarkModeChange = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode);
	};

	const handleUsaModeChange = () => {
		setUsaMode((prevUsaMode) => !prevUsaMode);
	};

	const handleSetCoordinates = ({ latitude, longitude }) => {
		// Update URL query and coordinates state
		router.push(`/main?latitude=${latitude}&longitude=${longitude}`);
	};

	return (
		<div>
			{weatherData && airQualityData ? (
				<>
					<BackgroundImage code={weatherData.current.weather_code} darkMode={darkMode} />
					<Card
						dataObject={weatherData}
						airObject={airQualityData}
						handleSetCoordinates={handleSetCoordinates}
						onSetDarkMode={handleDarkModeChange}
						onSetUsaMode={handleUsaModeChange}
						usaMode={usaMode}
						darkMode={darkMode}
					/>
				</>
			) : (
				<p>{isFetching ? 'Loading data...' : 'No data available'}</p>
			)}
		</div>
	);
}
