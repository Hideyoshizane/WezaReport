import React, { useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

const WeatherFetcher = ({ latitude, longitude, onFetch }) => {
	useEffect(() => {
		const fetchWeatherData = async () => {
			if (latitude && longitude) {
				// Weather parameters
				const weatherParams = {
					latitude,
					longitude,
					current: [
						'temperature_2m',
						'relative_humidity_2m',
						'precipitation',
						'cloud_cover',
						'surface_pressure',
						'wind_speed_10m',
						'wind_direction_10m',
					],
					daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'uv_index_max'],
					timezone: 'auto',
				};

				const weatherUrl = 'https://api.open-meteo.com/v1/forecast';

				// Air quality parameters
				const airQualityParams = {
					latitude,
					longitude,
					current: 'us_aqi',
					hourly: 'us_aqi',
					timezone: 'auto',
					forecast_days: 1,
				};

				const airQualityUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality';

				try {
					// Fetching weather data
					const weatherResponses = await fetchWeatherApi(weatherUrl, weatherParams);
					const weatherResponse = weatherResponses[0];

					// Fetching air quality data
					const airQualityResponses = await fetchWeatherApi(airQualityUrl, airQualityParams);
					const airQualityResponse = airQualityResponses[0];

					// Helper function to form time ranges
					const range = (start, stop, step) =>
						Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

					// Weather data processing
					const utcOffsetSeconds = weatherResponse.utcOffsetSeconds();
					const currentWeather = weatherResponse.current();
					const dailyWeather = weatherResponse.daily();

					const weatherData = {
						current: {
							time: new Date((Number(currentWeather.time()) + utcOffsetSeconds) * 1000),
							temperature2m: currentWeather.variables(0).value(),
							relativeHumidity2m: currentWeather.variables(1).value(),
							precipitation: currentWeather.variables(2).value(),
							cloudCover: currentWeather.variables(3).value(),
							surfacePressure: currentWeather.variables(4).value(),
							windSpeed10m: currentWeather.variables(5).value(),
							windDirection10m: currentWeather.variables(6).value(),
						},
						daily: {
							time: range(Number(dailyWeather.time()), Number(dailyWeather.timeEnd()), dailyWeather.interval()).map(
								(t) => new Date((t + utcOffsetSeconds) * 1000)
							),
							weatherCode: dailyWeather.variables(0).valuesArray(),
							temperature2mMax: dailyWeather.variables(1).valuesArray(),
							temperature2mMin: dailyWeather.variables(2).valuesArray(),
							uvIndexMax: dailyWeather.variables(3).valuesArray(),
						},
					};

					// Air quality data processing
					const currentAirQuality = airQualityResponse.current();
					const hourlyAirQuality = airQualityResponse.hourly();

					const airQualityData = {
						current: {
							time: new Date((Number(currentAirQuality.time()) + utcOffsetSeconds) * 1000),
							usAqi: currentAirQuality.variables(0).value(),
						},
						hourly: {
							time: range(
								Number(hourlyAirQuality.time()),
								Number(hourlyAirQuality.timeEnd()),
								hourlyAirQuality.interval()
							).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
							usAqi: hourlyAirQuality.variables(0).valuesArray(),
						},
					};

					// Combine weather and air quality data
					const combinedData = {
						weather: weatherData,
						airQuality: airQualityData,
					};

					// Pass the processed data back to the Main component
					onFetch(combinedData);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			}
		};

		fetchWeatherData();
	}, [latitude, longitude, onFetch]); // Fetch when latitude and longitude change

	return null; // No HTML elements are rendered
};

export default WeatherFetcher;
