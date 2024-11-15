import React from 'react';
import Image from 'next/image';

import styles from './Today.module.css';
import { useWeatherIcon } from '@/utils/weatherIcons';
import { convertTemp, roundTemperature } from '@/utils/temperatureUtils';

const Today = ({ time, code, maxTemp, lowTemp, apparentTemp, darkMode, usaMode }) => {
	const dayOfWeek = new Date(time).toLocaleDateString('en-US', { weekday: 'long' });
	const timeConverted = new Date(time).toISOString().slice(11, 16);

	maxTemp = usaMode ? convertTemp(maxTemp) : roundTemperature(maxTemp);
	lowTemp = usaMode ? convertTemp(lowTemp) : roundTemperature(lowTemp);
	apparentTemp = usaMode ? convertTemp(apparentTemp) : roundTemperature(apparentTemp);

	const { icon, category } = useWeatherIcon(code, darkMode);
	const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

	// Combine container and specific styles
	const getContainerStyle = () => `${styles.container} ${`${category}${darkMode ? 'Dark' : 'Light'}`}`;
	const getTextColor = () => (category === 'storm' && !darkMode ? 'darkText' : darkMode ? 'darkText' : 'lightText');

	const containerStyle = getContainerStyle();
	const textColor = getTextColor();

	return (
		<div className={containerStyle}>
			<div className={styles.firstRow}>
				<Image src={icon} alt={`${category} icon`} className={styles.iconSize} priority />
				<div className={styles.titleWrapper}>
					<h2 className={`${styles.Title} ${textColor}`}>Current Weather</h2>
					<h2 className={`${styles.Text} ${textColor}`}>
						{dayOfWeek}, {timeConverted}
					</h2>
					<h2 className={`${styles.Text} ${textColor}`}>{capitalizedCategory}</h2>
				</div>
			</div>
			<div className={styles.secondRow}>
				<h2 className={`${styles.max} ${textColor}`}>
					{maxTemp}°{usaMode ? 'F' : 'C'}
				</h2>
				<h2 className={`${styles.low} ${textColor}`}>
					{lowTemp}°{usaMode ? 'F' : 'C'}
				</h2>
				<h2 className={`${styles.apparentTemp} ${textColor}`}>
					Feels like {lowTemp}°{usaMode ? 'F' : 'C'}
				</h2>
			</div>
		</div>
	);
};

export default Today;
