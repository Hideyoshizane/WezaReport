import React from 'react';
import Image from 'next/image';

import { useWeatherIcon } from '@/utils/weatherIcons';

import styles from './BackgroundImage.module.css';

import sunny from '../../../public/assets/background/sunny.webp';
import cloudy from '../../../public/assets/background/cloudy.webp';
import rainy from '../../../public/assets/background/rainy.webp';
import snow from '../../../public/assets/background/snow.webp';
import snowstorm from '../../../public/assets/background/snowstorm.webp';
import storm from '../../../public/assets/background/storm.webp';
import dark from '../../../public/assets/background/dark.webp';

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
			<Image src={backgroundImage} alt={`${category} background`} fill style={{ objectFit: 'cover' }} />
		</div>
	);
};

export default BackgroundImage;
