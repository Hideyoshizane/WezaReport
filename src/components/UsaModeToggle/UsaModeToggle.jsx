import React from 'react';
import Image from 'next/image';

import styles from './UsaModeToggle.module.css';

const UsaModeToggle = ({ onUsaModeChange, usaMode, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? styles.darkText : styles.lightText;

	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>ºC</h1>
			</div>
		</div>
	);
};

export default UsaModeToggle;
