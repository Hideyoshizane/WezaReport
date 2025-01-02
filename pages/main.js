import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCoordinates } from '@/contexts/CoordinatesContext';

import Cookies from 'js-cookie';

import Card from '@/components/Card/Card';
import BackgroundImage from '@/components/BackgroundImage/BackgroundImage';
import Spinner from '@/components/Spinner/Spinner';

import '../styles/globals.css';

export default function Main() {
	const router = useRouter();
	const { latitude: queryLatitude, longitude: queryLongitude } = router.query;
	const { coordinates, updateCoordinates } = useCoordinates();
	const [darkMode, setDarkMode] = useState(() => {
		const storedDarkMode = Cookies.get('darkMode');
		return storedDarkMode ? storedDarkMode === 'true' : false; // Default to false
	});

	const [usaMode, setUsaMode] = useState(() => {
		const storedUsaMode = Cookies.get('usaMode');
		return storedUsaMode ? storedUsaMode === 'true' : false; // Default to false
	});

	const [weatherData, setWeatherData] = useState(null);
	const [airQualityData, setAirQualityData] = useState(null);

	// Fetch weather and air quality data based on latitude and longitude
	const fetchWeatherAndAirQualityData = async (lat, lon) => {
		const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;
		const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto&forecast_days=1`;

		try {
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
		}
	};

	useEffect(() => {
		if (queryLatitude && queryLongitude) {
			let lat = parseFloat(queryLatitude);
			let lon = parseFloat(queryLongitude);

			if (!isNaN(lat) && !isNaN(lon)) {
				updateCoordinates({ latitude: lat, longitude: lon });
			} else {
				console.log('Invalid latitude or longitude in query');
			}
		}
	}, [queryLatitude, queryLongitude]);

	// Fetch data when latitude or longitude changes, and they're valid
	useEffect(() => {
		if (coordinates.latitude !== null && coordinates.longitude !== null) {
			fetchWeatherAndAirQualityData(coordinates.latitude, coordinates.longitude);
		}
	}, [coordinates]); // Trigger when coordinates change

	// Update cookies when darkMode or usaMode changes
	useEffect(() => {
		Cookies.set('darkMode', darkMode.toString());
	}, [darkMode]);

	useEffect(() => {
		Cookies.set('usaMode', usaMode.toString());
	}, [usaMode]);

	const handleDarkModeChange = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode);
	};

	const handleUsaModeChange = () => {
		setUsaMode((prevUsaMode) => !prevUsaMode);
	};
	return (
		<div>
			<Head>
				<title>WezaReport</title>
			</Head>
			{weatherData && airQualityData ? (
				<>
					<BackgroundImage code={weatherData.current.weather_code} darkMode={darkMode} />
					<Card
						dataObject={weatherData}
						airObject={airQualityData}
						onSetDarkMode={handleDarkModeChange}
						onSetUsaMode={handleUsaModeChange}
						usaMode={usaMode}
						darkMode={darkMode}
					/>
				</>
			) : (
				<Spinner />
			)}
		</div>
	);
}
