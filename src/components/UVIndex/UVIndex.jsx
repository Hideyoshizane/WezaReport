import React, { useMemo } from 'react';
import UVChart from '../UVChart/UVChart';
import styles from './UVIndex.module.css';

const UVIndex = ({ uvValue, darkMode }) => {
	// Memoize the UV index message based on value
	const uvMessage = useMemo(() => {
		if (uvValue < 0) return `Invalid value (${uvValue})`;
		if (uvValue <= 2.9) return `Low (${uvValue})`;
		if (uvValue <= 5.9) return `Moderate (${uvValue})`;
		if (uvValue <= 7.9) return `High (${uvValue})`;
		if (uvValue <= 10.9) return `Very High (${uvValue})`;
		return `Extreme (${uvValue})`;
	}, [uvValue]);

	// Memoize container style and text color based on darkMode
	const { containerStyle, textColor } = useMemo(
		() => ({
			containerStyle: darkMode ? styles.darkContainer : styles.lightContainer,
			textColor: darkMode ? 'darkText' : 'lightText',
		}),
		[darkMode]
	);

	return (
		<div className={containerStyle}>
			<h1 className={`${styles.Title} ${textColor}`}>UV INDEX</h1>
			<UVChart value={uvValue} />
			<h2 className={`${styles.Level} ${textColor}`}>{uvMessage}</h2>
		</div>
	);
};

export default UVIndex;
