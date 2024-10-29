import React from 'react';
import Image from 'next/image';

import { useWeatherIcon } from '@/utils/weatherIcons';

import styles from './WeatherCard.module.css';

const WeatherCard = ({ day, code, maxTemp, lowTemp, darkMode, usaMode }) => {
	maxTemp = Number(maxTemp);
	lowTemp = Number(lowTemp);

	// Convert Celsius to Fahrenheit if usaMode is true
	if (usaMode) {
		maxTemp = Math.round(maxTemp * (9 / 5) + 32);
		lowTemp = Math.round(lowTemp * (9 / 5) + 32);
	}
	const { icon, category } = useWeatherIcon(code, darkMode);

	// Combine container and specific styles
	const containerStyle = `${styles.container} ${styles[`${category}${darkMode ? 'Dark' : 'Light'}`]}`;
	const textColor =
		containerStyle === `${styles.container} ${styles.stormLight}`
			? styles.darkText
			: darkMode
			? styles.darkText
			: styles.lightText;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>{day}</h1>
				<Image src={icon} alt={`${category} icon`} className={styles.iconSize} priority />
			</div>
			<div className={styles.temperatures}>
				<h2 className={`${styles.max} ${textColor}`}>
					{maxTemp}°{usaMode ? 'F' : 'C'}
				</h2>
				<h2 className={`${styles.low} ${textColor}`}>
					{lowTemp}°{usaMode ? 'F' : 'C'}
				</h2>
			</div>
		</div>
	);
};

export default WeatherCard;
