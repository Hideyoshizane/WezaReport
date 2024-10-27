import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './ForecastGroup.module.css';

const ForecastGroup = ({ currentDate, WeatherData, darkMode, usaMode }) => {
	const dateObj = new Date(currentDate);

	const daysArray = [];
	daysArray.push(dateObj.toLocaleDateString('en-US', { weekday: 'long' }));

	// Get the next 6 days of the week starting from array[1]
	for (let i = 1; i <= 6; i++) {
		const nextDate = new Date(dateObj);
		nextDate.setDate(dateObj.getDate() + i);
		daysArray.push(nextDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3));
	}

	return (
		<div className={styles.wrapper}>
			{Object.keys(WeatherData.weatherCode).map((key, index) => {
				const code = WeatherData.weatherCode[key];
				const maxTemp = Math.round(WeatherData.temperature2mMax[key]);
				const lowTemp = Math.round(WeatherData.temperature2mMin[key]);

				return (
					<WeatherCard
						key={key}
						day={daysArray[index]}
						code={code}
						maxTemp={usaMode ? (maxTemp * 9) / 5 + 32 : maxTemp} // Convert to F if usaMode is true
						lowTemp={usaMode ? (lowTemp * 9) / 5 + 32 : lowTemp} // Convert to F if usaMode is true
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				);
			})}
		</div>
	);
};

export default ForecastGroup;
