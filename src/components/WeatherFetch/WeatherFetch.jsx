import React, { useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

const WeatherFetcher = ({ latitude, longitude, onFetch }) => {
	useEffect(() => {
		const fetchWeatherData = async () => {
			if (latitude && longitude) {
				const weatherParams = {
					latitude,
					longitude,
					current: [
						'temperature_2m',
						'relative_humidity_2m',
						'precipitation',
						'weather_code',
						'cloud_cover',
						'surface_pressure',
						'wind_speed_10m',
						'wind_direction_10m',
					],
					hourly: ['relative_humidity_2m', 'precipitation_probability', 'visibility'],
					daily: [
						'weather_code',
						'temperature_2m_max',
						'temperature_2m_min',
						'uv_index_max',
						'precipitation_probability_max',
					],
					timezone: 'auto',
				};

				const weatherUrl = 'https://api.open-meteo.com/v1/forecast';

				const airQualityParams = {
					latitude,
					longitude,
					current: 'us_aqi',
					hourly: 'us_aqi',
					timezone: 'auto',
				};

				const airQualityUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality';

				try {
					// Fetching weather data
					const [weatherResponse] = await fetchWeatherApi(weatherUrl, weatherParams);
					if (!weatherResponse) throw new Error('Weather response is undefined.');

					// Fetching air quality data
					const [airQualityResponse] = await fetchWeatherApi(airQualityUrl, airQualityParams);
					if (!airQualityResponse) throw new Error('Air quality response is undefined.');

					const utcOffsetSeconds = weatherResponse.utcOffsetSeconds();
					const currentWeather = weatherResponse.current();
					const dailyWeather = weatherResponse.daily();
					const hourlyWeather = weatherResponse.hourly(); // Fetch hourly data

					const range = (start, stop, step) =>
						Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

					// Weather data processing
					const weatherData = {
						current: {
							time: new Date((Number(currentWeather.time()) + utcOffsetSeconds) * 1000),
							temperature2m: currentWeather.variables(0)?.value(),
							relativeHumidity2m: currentWeather.variables(1)?.value(),
							precipitation: currentWeather.variables(2)?.value(),
							weatherCode: currentWeather.variables(3)?.value(),
							cloudCover: currentWeather.variables(4)?.value(),
							surfacePressure: currentWeather.variables(5)?.value(),
							windSpeed10m: currentWeather.variables(6)?.value(),
							windDirection10m: currentWeather.variables(7)?.value(),
						},
						hourly: {
							time: range(Number(hourlyWeather.time()), Number(hourlyWeather.timeEnd()), hourlyWeather.interval()).map(
								(t) => new Date((t + utcOffsetSeconds) * 1000)
							),
							relativeHumidity2m: hourlyWeather.variables(0)?.valuesArray(),
							precipitationProbability: hourlyWeather.variables(1)?.valuesArray(),
							visibility: hourlyWeather.variables(2)?.valuesArray(),
						},
						daily: {
							time: Array.from(
								{ length: dailyWeather.time().length },
								(_, i) => new Date((Number(dailyWeather.time()[i]) + utcOffsetSeconds) * 1000)
							),
							weatherCode: dailyWeather.variables(0)?.valuesArray(),
							temperature2mMax: dailyWeather.variables(1)?.valuesArray(),
							temperature2mMin: dailyWeather.variables(2)?.valuesArray(),
							uvIndexMax: dailyWeather.variables(3)?.valuesArray(),
							precipitationProbabilityMax: dailyWeather.variables(4)?.valuesArray(),
						},
					};

					// Air quality data processing
					const currentAirQuality = airQualityResponse.current();
					const hourlyAirQuality = airQualityResponse.hourly();

					const airQualityData = {
						current: {
							time: new Date((Number(currentAirQuality.time()) + utcOffsetSeconds) * 1000),
							usAqi: currentAirQuality.variables(0)?.value(),
						},
						hourly: {
							time: Array.from(
								{ length: hourlyAirQuality.time().length },
								(_, i) => new Date((Number(hourlyAirQuality.time()[i]) + utcOffsetSeconds) * 1000)
							),
							usAqi: hourlyAirQuality.variables(0)?.valuesArray(),
						},
					};

					// Combine weather and air quality data
					const combinedData = {
						weather: weatherData,
						airQuality: airQualityData,
					};

					// Pass the processed data back to the parent component
					onFetch(combinedData);
				} catch (error) {
					console.error('Error fetching data:', error.message);
				}
			}
		};

		fetchWeatherData();
	}, [latitude, longitude, onFetch]); // Fetch when latitude and longitude change

	return null; // Consider returning a loading indicator or a message instead
};

export default WeatherFetcher;
