import React from 'react';
import Image from 'next/image';

import styles from './Visibility.module.css';

import lightIcon from '../../../public/assets/icons/light/visibility.png';
import darkIcon from '../../../public/assets/icons/dark/visibility.png';

const Visibility = ({ distance, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	const kilometers = (distance / 1000).toFixed(2);

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Visibility</h1>
				<Image src={icon} alt="Visibility Icon" className={styles.iconSize} priority />
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>{kilometers}Km</h2>
		</div>
	);
};

export default Visibility;
