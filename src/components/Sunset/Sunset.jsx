import React from 'react';
import Image from 'next/image';

import styles from './Sunset.module.css';

import lightIcon from '../../../public/assets/icons/light/sunset.png';
import darkIcon from '../../../public/assets/icons/dark/sunset.png';

const Sunset = ({ sunriseTime, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	// Simple function to format ISO date to "HH:MM"
	const formatISOToTime = (isoString) => {
		const date = new Date(isoString);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Sunset</h1>
			</div>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Sunrise Icon" className={styles.iconSize} priority />
				<h2 className={`${styles.Text} ${textColor}`}>{formatISOToTime(sunriseTime)}</h2>
			</div>
		</div>
	);
};

export default Sunset;
