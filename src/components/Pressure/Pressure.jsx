import React from 'react';
import Image from 'next/image';

import styles from './Pressure.module.css';

import lightIcon from '../../../public/assets/icons/light/pressure.png';
import darkIcon from '../../../public/assets/icons/dark/pressure.png';

const Pressure = ({ pressurehPa, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Pressure</h1>
				<Image src={icon} alt="Pressure Icon" className={styles.iconSize} priority />
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>{pressurehPa}hPa</h2>
		</div>
	);
};

export default Pressure;
