import React, { useEffect, useRef, useState } from 'react';
import styles from './UVChart.module.css';

const UVChart = ({ value }) => {
	const chartRef = useRef(null);
	const [ChartJS, setChartJS] = useState(null);

	// Dynamically import Chart.js and required components
	useEffect(() => {
		import('chart.js').then(({ Chart, ArcElement, Legend, DoughnutController }) => {
			Chart.register(ArcElement, Legend, DoughnutController);
			setChartJS(() => Chart);
		});
	}, []);

	// Utility to darken a color
	const darkenColor = (color, percentage) => {
		const amount = Math.round(2.55 * percentage);
		return color.replace(
			/rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
			(_, r, g, b) => `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`
		);
	};

	// Effect to initialize and update the chart
	useEffect(() => {
		if (ChartJS && chartRef.current) {
			const uvRanges = [
				{ max: 2.9, color: 'rgb(12, 131, 70)' },
				{ max: 5.9, color: 'rgb(251, 175, 0)' },
				{ max: 7.9, color: 'rgb(255, 204, 0)' },
				{ max: 10.9, color: 'rgb(222, 26, 26)' },
				{ max: Infinity, color: 'rgb(79, 71, 137)' },
			];

			// Determine the range color and hover color
			const { color: rangeColor } = uvRanges.find((range) => value <= range.max) || {};
			const hoverColor = darkenColor(rangeColor, 15);

			// Chart.js configuration
			const chartInstance = new ChartJS(chartRef.current, {
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
						legend: { display: false },
						tooltip: { enabled: false },
					},
					responsive: true,
					maintainAspectRatio: true,
				},
			});

			// Cleanup chart instance on unmount or re-render
			return () => chartInstance.destroy();
		}
	}, [ChartJS, value]);

	return (
		<div className={styles.chart}>
			<canvas ref={chartRef}></canvas>
		</div>
	);
};

export default UVChart;
