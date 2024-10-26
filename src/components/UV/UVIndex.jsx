import React from 'react';
import UVChart from '../UVChart/UVChart';
import styles from './UVIndex.module.css';

const UVIndex = ({ uvValue, darkMode }) => {
	// Function to determine UV index message based on the value
	const getUVMessage = (value) => {
		if (value < 0) return 'Invalid value';
		if (value <= 2.9) return 'Low';
		if (value <= 5.9) return 'Moderate';
		if (value <= 7.9) return 'High';
		if (value <= 10.9) return 'Very High';
		return 'Extreme';
	};

	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;

	return (
		<div className={containerStyle}>
			<h1 className={`${styles.Title} ${textColor}`}>UV INDEX</h1>
			<UVChart value={uvValue} />
			<h2 className={`${styles.Level} ${textColor}`}>{getUVMessage(uvValue)}</h2>
		</div>
	);
};

export default UVIndex;
