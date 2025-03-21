import React from 'react';
import Image from 'next/image';

import { useWeatherIcon } from '@/utils/weatherIcons';
import { convertTemp, roundTemperature } from '@/utils/temperatureUtils';

import styles from './WeatherCard.module.css';

const WeatherCard = ({ day, code, maxTemp, lowTemp, darkMode, usaMode }) => {
	maxTemp = usaMode ? convertTemp(maxTemp) : roundTemperature(maxTemp);
	lowTemp = usaMode ? convertTemp(lowTemp) : roundTemperature(lowTemp);

	const { icon, category } = useWeatherIcon(code, darkMode);

	const containerClass = `${styles.container} ${category}${darkMode ? 'Dark' : 'Light'}`;

	const isStormLight = category === 'storm';

	const textColor = isStormLight ? 'darkText' : darkMode ? 'darkText' : 'lightText';

	return (
		<div className={containerClass}>
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
