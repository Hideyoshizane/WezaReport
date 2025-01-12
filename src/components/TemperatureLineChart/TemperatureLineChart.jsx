import React, { useEffect, useRef } from 'react';
import {
	Chart,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineController,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';

import styles from './TemperatureLineChart.module.css';

// Register required Chart.js components
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const TemperatureLineChart = ({ time, convertedTemperature, darkMode, usaMode }) => {
	const chartRef = useRef(null);
	const chartInstanceRef = useRef(null);

	useEffect(() => {
		// Destroy existing chart instance if it exists
		if (chartInstanceRef.current) {
			chartInstanceRef.current.destroy();
		}

		// Determine colors based on dark mode
		const colors = {
			border: darkMode ? 'rgba(245, 245, 245, 1)' : 'rgba(17, 42, 70, 1)',
			background: darkMode ? 'rgba(245, 245, 245, 0.2)' : 'rgba(17, 42, 70, 0.2)',
			text: darkMode ? 'rgba(245, 245, 245, 1)' : 'rgba(0, 0, 0, 1)',
		};

		// Chart configuration
		const config = {
			type: 'line',
			data: {
				labels: time,
				datasets: [
					{
						label: `Temperature (${usaMode ? '°F' : '°C'})`,
						data: convertedTemperature,
						borderColor: colors.border,
						backgroundColor: colors.background,
						fill: true,
						tension: 0.1,
					},
				],
			},
			options: {
				animation: {
					duration: 2000,
					easing: 'easeInOutQuad',
				},
				interaction: { intersect: false },
				responsive: true,
				plugins: {
					legend: { labels: { color: colors.text } },
				},
				scales: {
					x: {
						ticks: { color: colors.text },
					},
					y: {
						title: { display: true, text: 'Temperature', color: colors.text },
						ticks: { color: colors.text },
					},
				},
			},
		};

		// Create chart instance
		const ctx = chartRef.current.getContext('2d');
		chartInstanceRef.current = new Chart(ctx, config);

		// Cleanup on component unmount
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
