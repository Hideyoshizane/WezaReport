import React from 'react';
import Image from 'next/image';

import styles from './RainProbability.module.css';

import lightIcon from '../../../public/assets/icons/light/rain.png';
import darkIcon from '../../../public/assets/icons/dark/rain.png';

const RainProbability = ({ percentage, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Rain Probability Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor}`}>Rain Probability</h1>
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>{percentage}%</h2>
		</div>
	);
};

export default RainProbability;
