import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './Location.module.css';

import lightIcon from '../../../public/assets/icons/light/location.png';
import darkIcon from '../../../public/assets/icons/dark/location.png';

// Function to fetch the city from coordinates
async function getCityFromCoordinates(latitude, longitude) {
	const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data && data.address) {
			const city = data.address.city || data.address.town || data.address.village || 'City not found';
			const country = data.address.country || 'Country not found';
			return `${city}, ${country}`;
		} else {
			return 'Location not found';
		}
	} catch (error) {
		console.error('Error fetching the city name:', error);
		return 'Error fetching location';
	}
}

const Location = ({ latitude, longitude, darkMode }) => {
	const [city, setCity] = useState('Loading...'); // Initial loading state
	const textColor = darkMode ? 'darkText' : 'lightText'; // Text color based on dark mode
	const icon = darkMode ? darkIcon : lightIcon; // Icon based on dark mode

	useEffect(() => {
		// Only fetch if latitude and longitude are provided
		if (latitude && longitude) {
			getCityFromCoordinates(latitude, longitude)
				.then((fetchedCity) => setCity(fetchedCity))
				.catch(() => setCity('Error fetching location'));
		} else {
			setCity('Coordinates not provided');
		}
		// Dependency array includes latitude and longitude so it updates when they change
	}, [latitude, longitude]); // Update when latitude or longitude changes

	return (
		<div className={styles.container}>
			<div className={styles.titleWrapper}>
				<Image src={icon} alt="Location Icon" className={styles.iconSize} priority />
				<h1 className={`${styles.Title} ${textColor}`}>{city}</h1>
			</div>
		</div>
	);
};

export default Location;
