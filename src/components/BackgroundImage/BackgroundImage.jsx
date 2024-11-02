import React from 'react';
import Image from 'next/image';

import { useWeatherIcon } from '@/utils/weatherIcons';

import styles from './BackgroundImage.module.css';

import sunny from '../../../public/assets/background/sunny.jpg';
import cloudy from '../../../public/assets/background/cloudy.jpg';
import rainy from '../../../public/assets/background/rainy.jpg';
import snow from '../../../public/assets/background/snow.jpg';
import snowstorm from '../../../public/assets/background/snowstorm.jpg';
import storm from '../../../public/assets/background/storm.jpg';
import dark from '../../../public/assets/background/dark.jpg';

const categoryToImage = {
	sunny,
	cloudy,
	rainy,
	snow,
	snowstorm,
	storm,
};

const BackgroundImage = ({ code, darkMode }) => {
	const { category } = useWeatherIcon(code, darkMode);
	const backgroundImage = darkMode ? dark : categoryToImage[category];

	return (
		<div className={styles.container}>
			<Image src={backgroundImage} alt={`${category} background`} fill priority style={{ objectFit: 'cover' }} />
		</div>
	);
};

export default BackgroundImage;
