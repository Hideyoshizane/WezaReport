import React from 'react';
import Image from 'next/image';

import styles from './AirQuality.module.css';

import lightIcon from '../../../public/assets/icons/light/air.png';
import darkIcon from '../../../public/assets/icons/dark/air.png';

const AirQuality = ({ AQI, darkMode }) => {
	// Function to determine AQI message based on the value
	const getAQIMessage = (value) => {
		if (value < 0) return 'Invalid value';
		if (value <= 50) return 'Good';
		if (value <= 100) return 'Moderate';
		if (value <= 150) return 'Sensitive';
		if (value <= 200) return 'Unhealthy';
		if (value <= 300) return 'Very Bad';
		return 'Hazardous';
	};
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Air Quality Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor}`}>Air Quality</h1>
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>
				{getAQIMessage(AQI)} ({AQI})
			</h2>
		</div>
	);
};

export default AirQuality;
