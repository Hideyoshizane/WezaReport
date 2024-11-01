import React from 'react';
import Image from 'next/image';

import styles from './UsaModeToggle.module.css';

const UsaModeToggle = ({ onUsaModeChange, usaMode, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;

	return (
		<div style={{ display: 'flex' }} onClick={onUsaModeChange}>
			<div className={containerStyle}>
				<h1 className={`${styles.Icon} ${textColor}`}>{usaMode ? 'ºF' : 'ºC'}</h1>
			</div>
			<div className={styles.textDiv}>
				<h2 className={`${styles.Text} ${textColor}`}>{usaMode ? 'Toggle Celsius' : 'Toggle Fahrenheit'}</h2>
			</div>
		</div>
	);
};

export default UsaModeToggle;
