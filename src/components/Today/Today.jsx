import React, { useMemo, useCallback } from 'react';
import Image from 'next/image';

import styles from './Today.module.css';
import { useWeatherIcon } from '@/utils/weatherIcons';
import { convertTemp, roundTemperature } from '@/utils/temperatureUtils';

const Today = ({ time, code, maxTemp, lowTemp, apparentTemp, darkMode, usaMode }) => {
	const dayOfWeek = useMemo(() => new Date(time).toLocaleDateString('en-US', { weekday: 'long' }), [time]);
	const timeConverted = useMemo(
		() => new Date(time).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
		[time]
	);

	const getConvertedTemp = useCallback((temp) => (usaMode ? convertTemp(temp) : roundTemperature(temp)), [usaMode]);

	const maxTempConverted = useMemo(() => getConvertedTemp(maxTemp), [maxTemp, getConvertedTemp]);
	const lowTempConverted = useMemo(() => getConvertedTemp(lowTemp), [lowTemp, getConvertedTemp]);
	const apparentTempConverted = useMemo(() => getConvertedTemp(apparentTemp), [apparentTemp, getConvertedTemp]);

	const { icon, category } = useWeatherIcon(code, darkMode);
	const capitalizedCategory = useMemo(() => category.charAt(0).toUpperCase() + category.slice(1), [category]);

	const containerStyle = useMemo(
		() => `${styles.container} ${category}${darkMode ? 'Dark' : 'Light'}`,
		[category, darkMode]
	);
	const textColor = useMemo(
		() => (category === 'storm' && !darkMode ? 'darkText' : darkMode ? 'darkText' : 'lightText'),
		[category, darkMode]
	);

	return (
		<>
			<div className={containerStyle}>
				<div className={styles.firstRow}>
					<Image src={icon} alt={`${category} icon`} className={styles.iconSize} />
					<div className={styles.titleWrapper}>
						<h2 className={`${styles.Title} ${textColor}`}>Current Weather</h2>
						<h2 className={`${styles.Text} ${textColor}`}>
							{dayOfWeek}, {timeConverted}
						</h2>
						<h2 className={`${styles.Text} ${textColor}`}>{capitalizedCategory}</h2>
					</div>
				</div>
				<div className={styles.secondRow}>
					<h2 className={`${styles.max} ${textColor}`}>
						{maxTempConverted}°{usaMode ? 'F' : 'C'}
					</h2>
					<h2 className={`${styles.low} ${textColor}`}>
						{lowTempConverted}°{usaMode ? 'F' : 'C'}
					</h2>
					<h2 className={`${styles.apparentTemp} ${textColor}`}>
						Feels like {apparentTempConverted}°{usaMode ? 'F' : 'C'}
					</h2>
				</div>
			</div>
		</>
	);
};

export default Today;
