import React from 'react';
import TemperatureLineChart from '@/components/TemperatureLineChart/TemperatureLineChart'; // Import the new chart component
import styles from './TemperatureChart.module.css';

const TemperatureChart = ({ temperature, time, darkMode, usaMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';

	const convertedTemperature = usaMode ? temperature.map((temp) => (temp * 9) / 5 + 32) : temperature;

	const formattedTime = time.map((t) => {
		const date = new Date(t); // Convert to Date object
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false, // 24-hour format
		});
	});
	return (
		<div className={containerStyle}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Temperature Today</h1>
			</div>
			<TemperatureLineChart
				time={formattedTime}
				convertedTemperature={convertedTemperature}
				darkMode={darkMode}
				usaMode={usaMode}
			/>
		</div>
	);
};

export default TemperatureChart;
