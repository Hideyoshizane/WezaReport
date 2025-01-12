import React from 'react';
import Image from 'next/image';

import styles from './Sunrise.module.css';

import lightIcon from '../../../public/assets/icons/light/sunrise.webp';
import darkIcon from '../../../public/assets/icons/dark/sunrise.webp';

import { formatISOToTime } from '@/utils/dateUtils';

const Sunrise = ({ sunriseTime, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Sunrise</h1>
			</div>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Sunrise Icon" className={styles.iconSize} priority />
				<h2 className={`${styles.Text} ${textColor}`}>{formatISOToTime(sunriseTime)}</h2>
			</div>
		</div>
	);
};

export default Sunrise;
