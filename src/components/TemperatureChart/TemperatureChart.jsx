import React, { useState } from 'react';
import { motion } from 'framer-motion';

import TemperatureLineChart from '@/components/TemperatureLineChart/TemperatureLineChart';
import styles from './TemperatureChart.module.css';

import { popInAnimation } from '@/utils/animations';
import { convertTemp } from '@/utils/temperatureUtils';
import { formatTimeArray } from '@/utils/dateUtils';

const TemperatureChart = ({ temperature, time, darkMode, usaMode }) => {
	const [chartVisible, setChartVisible] = useState(false);

	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	const textColor = darkMode ? 'darkText' : 'lightText';

	const convertedTemperature = usaMode ? temperature.map((temp) => convertTemp(temp)) : temperature;

	const formattedTime = formatTimeArray(time);
	return (
		<motion.div className={containerStyle} {...popInAnimation} onAnimationComplete={() => setChartVisible(true)}>
			<div className={styles.titleWrapper}>
				<h1 className={`${styles.Title} ${textColor}`}>Temperature Today</h1>
			</div>
			<div className={styles.chartWrapper}>
				{chartVisible ? (
					<TemperatureLineChart
						time={formattedTime}
						convertedTemperature={convertedTemperature}
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				) : (
					<div className={styles.placeholder}></div>
				)}
			</div>
		</motion.div>
	);
};

export default TemperatureChart;
