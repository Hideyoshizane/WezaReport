import React, { useEffect } from 'react';

const WeatherFetcher = ({ latitude, longitude, onFetch }) => {
	useEffect(() => {
		const fetchWeatherData = async () => {
			// Fetch weather data
			const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;

			const weatherResponse = await fetch(weatherUrl);
			const weatherData = await weatherResponse.json();

			// Fetch air quality data
			const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto&forecast_days=1`;
			const airQualityResponse = await fetch(airQualityUrl);
			const airQualityData = await airQualityResponse.json();

			const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

			// Weather Data Processing
			const utcOffsetSeconds = weatherData.utc_offset_seconds;
			const currentWeather = weatherData.current_weather;

			const formattedWeatherData = {
				weather: {
					current: {
						time: new Date((Number(currentWeather.time) + utcOffsetSeconds) * 1000),
						temperature2m: currentWeather.temperature_2m,
						relativeHumidity2m: currentWeather.relative_humidity_2m,
						precipitation: currentWeather.precipitation,
						weatherCode: currentWeather.weather_code,
						cloudCover: currentWeather.cloud_cover,
						windSpeed10m: currentWeather.wind_speed_10m,
						windDirection10m: currentWeather.wind_direction_10m,
					},
					hourly: {
						time: range(
							Number(weatherData.hourly.time[0]),
							Number(weatherData.hourly.time[weatherData.hourly.time.length - 1]),
							weatherData.hourly.time.length
						).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
						temperature2m: weatherData.hourly.temperature_2m,
						relativeHumidity2m: weatherData.hourly.relative_humidity_2m,
						precipitationProbability: weatherData.hourly.precipitation_probability,
						visibility: weatherData.hourly.visibility,
					},
					daily: {
						time: range(
							Number(weatherData.daily.time[0]),
							Number(weatherData.daily.time[weatherData.daily.time.length - 1]),
							weatherData.daily.time.length
						).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
						weatherCode: weatherData.daily.weather_code,
						temperature2mMax: weatherData.daily.temperature_2m_max,
						temperature2mMin: weatherData.daily.temperature_2m_min,
						sunrise: weatherData.daily.sunrise,
						sunset: weatherData.daily.sunset,
						uvIndexMax: weatherData.daily.uv_index_max,
						precipitationProbabilityMax: weatherData.daily.precipitation_probability_max,
					},
				},
				airQuality: {
					current: {
						time: new Date((Number(airQualityData.current.time) + airQualityData.utc_offset_seconds) * 1000),
						usAqi: airQualityData.current.us_aqi,
					},
				},
			};

			// Pass the processed data back to the parent component
			onFetch(formattedWeatherData);
		};

		if (latitude && longitude) {
			fetchWeatherData();
		}
	}, [latitude, longitude, onFetch]); // Fetch when latitude and longitude change

	return null;
};

export default WeatherFetcher;
