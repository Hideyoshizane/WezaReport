import React from 'react';
import Image from 'next/image';

import styles from './Wind.module.css';

import lightIcon from '../../../public/assets/icons/light/wind.webp';
import darkIcon from '../../../public/assets/icons/dark/wind.webp';

import windDirectionIconLight from '../../../public/assets/icons/light/windDirection.webp';
import windDirectionIconDark from '../../../public/assets/icons/dark/windDirection.webp';

const Wind = ({ windSpeed, windDirection, darkMode, usaMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const icon = darkMode ? darkIcon : lightIcon;
	const windIcon = darkMode ? windDirectionIconDark : windDirectionIconLight;

	const displayWindSpeed = usaMode ? (windSpeed * 0.621371).toFixed(2) : windSpeed;

	const windIconStyle = {
		transform: `rotate(${windDirection}deg)`,
	};

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Wind Status Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor}`}>Wind Status</h1>
			</div>
			<div className={styles.titleWrapper}>
				<Image src={windIcon} alt="Wind Direction Icon" className={styles.iconSize} style={windIconStyle} priority />
				<h2 className={`${styles.Text} ${textColor}`}>
					{displayWindSpeed}
					{usaMode ? ' mph' : ' km/h'}
				</h2>
			</div>
		</div>
	);
};

export default Wind;
