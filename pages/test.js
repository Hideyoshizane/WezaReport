import React, { useEffect, useState } from 'react';

import Card from '@/components/Card/Card';
import BackgroundImage from '@/components/BackgroundImage/BackgroundImage';

import '../styles/globals.css';

import AirQualityPlaceholder from '../Airquality.json';
import WeatherPlaceholder from '../placeholder.json';

export default function Main() {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

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

	// Default coordinates
	const DEFAULT_LATITUDE = 40.7128;
	const DEFAULT_LONGITUDE = -74.006;

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
		const initializeLocation = async () => {
			let lat, lon;

			if (navigator.geolocation) {
				await new Promise((resolve) => {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							lat = position.coords.latitude;
							lon = position.coords.longitude;
							setLatitude(lat);
							setLongitude(lon);
							localStorage.setItem('latitude', lat);
							localStorage.setItem('longitude', lon);
							resolve();
						},
						() => {
							const savedLatitude = localStorage.getItem('latitude');
							const savedLongitude = localStorage.getItem('longitude');
							if (savedLatitude && savedLongitude) {
								lat = savedLatitude;
								lon = savedLongitude;
								setLatitude(lat);
								setLongitude(lon);
							} else {
								lat = DEFAULT_LATITUDE;
								lon = DEFAULT_LONGITUDE;
								setLatitude(lat);
								setLongitude(lon);
							}
							resolve();
						}
					);
				});
			} else {
				lat = DEFAULT_LATITUDE;
				lon = DEFAULT_LONGITUDE;
				setLatitude(lat);
				setLongitude(lon);
			}
		};

		initializeLocation();
	}, []);

	// Re-fetch data whenever latitude or longitude changes
	useEffect(() => {
		if (latitude && longitude) {
			//fetchWeatherAndAirQualityData(latitude, longitude);
		}
	}, [latitude, longitude]);

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

	return (
		<div>
			{WeatherPlaceholder && AirQualityPlaceholder ? (
				<>
					<BackgroundImage code={WeatherPlaceholder.current.weather_code} darkMode={darkMode} />
					<Card
						dataObject={WeatherPlaceholder}
						airObject={AirQualityPlaceholder}
						onSetLatitude={setLatitude}
						onSetLongitude={setLongitude}
						onSetDarkMode={handleDarkModeChange}
						onSetUsaMode={handleUsaModeChange}
						usaMode={usaMode}
						darkMode={darkMode}
					/>
				</>
			) : (
				<p>Loading...</p> // Display a loading message while data is being fetched
			)}
		</div>
	);
}

// dataObject = { weatherData };
// airObject = { airQualityData };
