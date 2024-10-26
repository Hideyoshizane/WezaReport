// pages/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IndexPageComponent from '../src/components/Index/Index'; // Changed to camelCase

import '../styles/globals.css'; // Import the global CSS file

const Home = () => {
	const router = useRouter();
	const [loading] = useState(true);

	// Default coordinates (Walt Disney World, Florida)
	const defaultLatitude = '28.41601261753784';
	const defaultLongitude = '-81.5811970806693';

	// Check for existing latitude and longitude
	useEffect(() => {
		const storedLatitude = localStorage.getItem('latitude');
		const storedLongitude = localStorage.getItem('longitude');

		if (storedLatitude && storedLongitude) {
			// Redirect to MainPage with stored latitude and longitude
			router.push(`/main?latitude=${storedLatitude}&longitude=${storedLongitude}`);
		} else {
			// If no stored values, request location
			getLocation();
		}
	}, [router]); // Added router to dependency array

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;

					localStorage.setItem('latitude', latitude);
					localStorage.setItem('longitude', longitude);
					router.push(`/main?latitude=${latitude}&longitude=${longitude}`);
				},
				(error) => {
					console.error('Error retrieving location:', error);
					// If user denies permission or error occurs, use default values
					router.push(`/main?latitude=${defaultLatitude}&longitude=${defaultLongitude}`);
				}
			);
		} else {
			// Handle case when geolocation is not supported
			console.warn('Geolocation is not supported by this browser.');
			router.push(`/main?latitude=${defaultLatitude}&longitude=${defaultLongitude}`);
		}
	};

	// If latitude and longitude are being checked, show nothing (or a loading indicator)
	if (loading) {
		return null;
	}

	return <IndexPageComponent />;
};

export default Home;
