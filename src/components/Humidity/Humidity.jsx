import React from 'react';
import Image from 'next/image';

import styles from './Humidity.module.css';

import lightIcon from '../../../public/assets/icons/light/humidity.webp';
import darkIcon from '../../../public/assets/icons/dark/humidity.webp';

const Humidity = ({ percentage, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Humidity Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor}`}>Humidity</h1>
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>{percentage}%</h2>
		</div>
	);
};

export default Humidity;
