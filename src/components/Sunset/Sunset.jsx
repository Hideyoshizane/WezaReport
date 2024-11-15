import React from 'react';
import Image from 'next/image';

import styles from './Sunset.module.css';

import lightIcon from '../../../public/assets/icons/light/sunset.png';
import darkIcon from '../../../public/assets/icons/dark/sunset.png';

import { formatISOToTime } from '@/utils/dateUtils';

const Sunset = ({ sunsetTime, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Sunset</h1>
			</div>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Sunrise Icon" className={styles.iconSize} priority />
				<h2 className={`${styles.Text} ${textColor}`}>{formatISOToTime(sunsetTime)}</h2>
			</div>
		</div>
	);
};

export default Sunset;
