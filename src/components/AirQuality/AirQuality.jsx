import React, { memo } from 'react';
import Image from 'next/image';

import styles from './AirQuality.module.css';
import '../../../styles/globals.css';

import lightIcon from '../../../public/assets/icons/light/air.webp';
import darkIcon from '../../../public/assets/icons/dark/air.webp';

// Function to determine AQI message based on the value
const getAQIMessage = (value) => {
	if (value < 0) return 'Invalid value';

	const levels = [
		{ max: 50, message: 'Good' },
		{ max: 100, message: 'Moderate' },
		{ max: 150, message: 'Sensitive' },
		{ max: 200, message: 'Unhealthy' },
		{ max: 300, message: 'Very Bad' },
		{ max: Infinity, message: 'Hazardous' },
	];

	return levels.find(({ max }) => value <= max)?.message || 'Invalid value';
};

const AirQuality = ({ AQI, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';

	const icon = darkMode ? darkIcon : lightIcon;

	const aqiMessage = getAQIMessage(AQI);

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Air Quality Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor} ${styles.textPadding}`}>Air Quality</h1>
			</div>
			<h2 className={`${styles.Text} ${textColor} ${styles.textPadding}`}>
				{aqiMessage} ({AQI})
			</h2>
		</div>
	);
};

export default memo(AirQuality);
