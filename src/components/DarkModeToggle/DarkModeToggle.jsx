import React from 'react';
import Image from 'next/image';

import nightIcon from '../../../public/assets/icons/light/darkMode.png';
import dayIcon from '../../../public/assets/icons/light/sunny.png';

import styles from './DarkModeToggle.module.css';
const DarkModeToggle = ({ onDarkModeChange, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const iconColor = darkMode ? styles.darkIconColor : styles.lightIconColor;
	const textType = darkMode ? styles.NightType : styles.LightType;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const slideClass = darkMode ? styles.slideInLeft : styles.slideInRight;

	return (
		<div style={{ display: 'flex' }} onClick={onDarkModeChange}>
			<div className={containerStyle}>
				{darkMode ? (
					<>
						<h2 className={`${textType} ${textColor} ${slideClass}`}>Night</h2>
						<div className={`${iconColor} ${slideClass}`}>
							<Image src={nightIcon} alt="Night Icon" className={styles.iconSize} priority />
						</div>
					</>
				) : (
					<>
						<div className={`${iconColor} ${slideClass}`}>
							<Image src={dayIcon} alt="Day Icon" className={styles.iconSize} priority />
						</div>
						<h2 className={`${textType} ${textColor} ${slideClass}`}>Day</h2>
					</>
				)}
			</div>
			<h2 className={`${styles.Text} ${textColor}`}>{darkMode ? 'Toggle Dark Mode' : 'Toggle Light Mode'}</h2>
		</div>
	);
};

export default DarkModeToggle;
