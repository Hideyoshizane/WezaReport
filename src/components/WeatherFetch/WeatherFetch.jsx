import React, { useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

const WeatherFetcher = ({ latitude, longitude, onFetch }) => {
	useEffect(() => {
		const fetchWeatherData = async () => {
			if (latitude && longitude) {
				const params = {
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

				const url = 'https://api.open-meteo.com/v1/forecast';

				try {
					const responses = await fetchWeatherApi(url, params);

					// Helper function to form time ranges
					const range = (start, stop, step) =>
						Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

					// Assuming the responses have an array format
					const response = responses[0];

					// Attributes for timezone and location
					const utcOffsetSeconds = response.utcOffsetSeconds();
					const timezone = response.timezone();
					const timezoneAbbreviation = response.timezoneAbbreviation();
					const latitude = response.latitude();
					const longitude = response.longitude();

					const current = response.current();
					const daily = response.daily();

					// Note: The order of weather variables in the URL query and the indices below need to match!
					const weatherData = {
						current: {
							time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
							temperature2m: current.variables(0).value(),
							relativeHumidity2m: current.variables(1).value(),
							precipitation: current.variables(2).value(),
							cloudCover: current.variables(3).value(),
							surfacePressure: current.variables(4).value(),
							windSpeed10m: current.variables(5).value(),
							windDirection10m: current.variables(6).value(),
						},
						daily: {
							time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
								(t) => new Date((t + utcOffsetSeconds) * 1000)
							),
							weatherCode: daily.variables(0).valuesArray(),
							temperature2mMax: daily.variables(1).valuesArray(),
							temperature2mMin: daily.variables(2).valuesArray(),
							uvIndexMax: daily.variables(3).valuesArray(),
						},
					};

					// Pass the processed weather data back to the Main component
					onFetch(weatherData);

					// Log daily weather data
					for (let i = 0; i < weatherData.daily.time.length; i++) {
						console.log(
							weatherData.daily.time[i].toISOString(),
							weatherData.daily.weatherCode[i],
							weatherData.daily.temperature2mMax[i],
							weatherData.daily.temperature2mMin[i],
							weatherData.daily.uvIndexMax[i]
						);
					}
				} catch (error) {
					console.error('Error fetching weather data:', error);
				}
			}
		};

		fetchWeatherData();
	}, [latitude, longitude, onFetch]); // Fetch when latitude and longitude change

	return null; // No HTML elements are rendered
};

export default WeatherFetcher;
