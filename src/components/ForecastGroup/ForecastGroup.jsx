import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './ForecastGroup.module.css';

const ForecastGroup = ({ currentDate, WeatherData, darkMode, usaMode }) => {
	const dateObj = new Date(currentDate);

	const daysArray = [];
	daysArray.push(dateObj.toLocaleDateString('en-US', { weekday: 'long' }));

	for (let i = 1; i <= 6; i++) {
		const nextDate = new Date(dateObj);
		nextDate.setDate(dateObj.getDate() + i);
		daysArray.push(nextDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3));
	}

	return (
		<div className={styles.wrapper}>
			{Object.keys(WeatherData.weather_code)
				.slice(1, 7)
				.map((key, index) => {
					const code = WeatherData.weather_code[key];
					const maxTemp = Math.round(WeatherData.temperature_2m_max[key]);
					const lowTemp = Math.round(WeatherData.temperature_2m_min[key]);

					return (
						<WeatherCard
							key={key}
							day={daysArray[index + 1]}
							code={code}
							maxTemp={maxTemp}
							lowTemp={lowTemp}
							darkMode={darkMode}
							usaMode={usaMode}
						/>
					);
				})}
		</div>
	);
};

export default ForecastGroup;
