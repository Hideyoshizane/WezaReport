import React, { useEffect, useRef } from 'react';
import {
	Chart,
	LineElement,
	PointElement,
	LineController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import styles from './TemperatureLineChart.module.css';

// Register necessary components
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TemperatureLineChart = ({ time, convertedTemperature, darkMode, usaMode }) => {
	const chartRef = useRef(null);
	const chartInstanceRef = useRef(null);

	useEffect(() => {
		// Clean up existing chart instance if it exists
		if (chartInstanceRef.current) {
			chartInstanceRef.current.destroy();
		}

		// Define colors based on darkMode
		const borderColor = darkMode ? 'rgba(245, 245, 245, 1)' : 'rgba(17, 42, 70, 1)';
		const backgroundColor = darkMode ? 'rgba(245, 245, 245, 0.2)' : 'rgba(17, 42, 70, 0.2)';
		const textColor = darkMode ? 'rgba(245, 245, 245, 1)' : 'rgba(0, 0, 0, 1)'; // Adjusted text color for light mode

		// Create data object for the chart
		const data = {
			labels: time, // x-axis labels
			datasets: [
				{
					label: `Temperature (${usaMode ? '°F' : '°C'})`,
					data: convertedTemperature,
					borderColor: borderColor, // Line color
					backgroundColor: backgroundColor, // Area color
					fill: true,
					tension: 0.1,
					pointStyle: 'circle',
				},
			],
		};

		// Define chart configuration
		const config = {
			type: 'line',
			data: data,
			options: {
				animation: {
					duration: 2000,
					easing: 'easeInOutQuad',
				},
				interaction: {
					intersect: false,
				},
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: textColor,
						},
					},
				},
				scales: {
					x: {
						title: {
							display: false,
							text: 'Time',
							color: textColor,
						},
						ticks: {
							color: textColor,
						},
					},
					y: {
						title: {
							display: true,
							text: 'Temperature',
							color: textColor,
						},
						ticks: {
							color: textColor,
						},
					},
				},
			},
		};

		const ctx = chartRef.current.getContext('2d');
		chartInstanceRef.current = new Chart(ctx, config);

		return () => {
			chartInstanceRef.current.destroy();
		};
	}, [time, convertedTemperature, darkMode, usaMode]);

	return (
		<div className={styles.container}>
			<canvas ref={chartRef} />
		</div>
	);
};

export default TemperatureLineChart;
