import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Legend, DoughnutController } from 'chart.js';

import styles from './UVChart.module.css';

Chart.register(ArcElement, Legend, DoughnutController);

// Function to darken color by a certain percentage
const darkenColor = (color, percentage) => {
	const amount = Math.round(2.55 * percentage);
	return color.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/, (_, r, g, b) => {
		return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`;
	});
};

const UVChart = ({ value }) => {
	const chartRef = useRef(null);

	const uvRanges = [
		{ max: 2.9, color: 'rgb(12, 131, 70)' },
		{ max: 5.9, color: 'rgb(251, 175, 0)' },
		{ max: 7.9, color: 'rgb(255, 204, 0)' },
		{ max: 10.9, color: 'rgb(222, 26, 26)' },
		{ max: Infinity, color: 'rgb(79, 71, 137)' },
	];

	const range = uvRanges.find((range) => value <= range.max);
	const rangeColor = range.color;
	const hoverColor = darkenColor(rangeColor, 15);

	useEffect(() => {
		const chartInstance = new Chart(chartRef.current, {
			type: 'doughnut',
			data: {
				labels: [`UV Index: ${value}`],
				datasets: [
					{
						data: [value, 11 - value],
						backgroundColor: [rangeColor, '#e0e0e0'],
						hoverBackgroundColor: [hoverColor, '#e0e0e0'],
						borderWidth: 0,
					},
				],
			},
			options: {
				rotation: -90,
				circumference: 180,
				cutout: '70%',
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false,
					},
				},
				responsive: true,
				maintainAspectRatio: true,
			},
		});

		return () => chartInstance.destroy();
	}, [value, rangeColor, hoverColor]);

	return (
		<div className={styles.chart}>
			<canvas ref={chartRef}></canvas>
		</div>
	);
};

export default UVChart;
