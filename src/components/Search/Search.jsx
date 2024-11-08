import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Search.module.css';

import lightIcon from '../../../public/assets/icons/light/search.png';
import darkIcon from '../../../public/assets/icons/dark/search.png';

const Search = ({ handleSetCoordinates, darkMode }) => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');
	const suggestionsRef = useRef(null);

	const fetchCities = async (query) => {
		// Nominatim API URL
		const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
			query
		)}&format=json&addressdetails=1&limit=5`;

		// The Nominatim API requires a user agent (replace 'YourApp' with your application name)
		const options = {
			headers: {
				'User-Agent': 'YourApp/1.0', // Replace with your app's name or email
			},
		};

		try {
			setError('');
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Process the data to extract relevant information in the format "City, Country"
			const placeSuggestions = data.map((place) => {
				// Extract city and country
				const city = place.address.city || place.address.town || place.address.village || '';
				const country = place.address.country || '';
				const name = city && country ? `${city}, ${country}` : place.display_name; // Fallback to full address if city or country is missing

				return {
					name: name, // "City, Country" format
					state: place.address.state || '',
					country: country,
					latitude: place.lat,
					longitude: place.lon,
				};
			});

			setSuggestions(placeSuggestions);
		} catch (error) {
			console.error('Error fetching place suggestions:', error.message);
			setError('Failed to fetch suggestions. Please try again.');
			setSuggestions([]);
		}
	};

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		// Fetch suggestions only if the input is long enough
		if (newValue.length > 2) {
			fetchCities(newValue);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (city) => {
		const newLatitude = parseFloat(city.latitude);
		const newLongitude = parseFloat(city.longitude);
		setInputValue(city.name);
		handleSetCoordinates({ latitude: newLatitude, longitude: newLongitude });

		setSuggestions([]);
	};

	const handleClickAway = (event) => {
		if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
			setSuggestions([]);
		}
	};

	const handleFocus = () => {
		setInputValue('');
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickAway);
		return () => {
			document.removeEventListener('mousedown', handleClickAway);
		};
	}, []);

	const containerStyle = `${darkMode ? styles.darkContainer : styles.lightContainer} ${
		suggestions.length > 0 ? styles.expanded : ''
	}`;
	const textColor = darkMode ? 'darkText' : 'lightText';
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		<div className={styles.parentDiv}>
			<div className={containerStyle}>
				<div className={styles.iconInput}>
					<Image src={icon} alt="Search Icon" className={styles.iconSize} priority />
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onFocus={handleFocus}
						onBlur={() => inputValue === '' && setSuggestions([])}
						placeholder="Search for a city"
						className={`${styles.searchInput} ${textColor}`}
					/>
				</div>
				{error && <div className={styles.error}>{error}</div>}
				{suggestions.length > 0 && (
					<div className={styles.suggestionsContainer} ref={suggestionsRef}>
						<ul className={styles.suggestionsList}>
							{suggestions.map((city, index) => (
								<li
									key={`${city.latitude}-${city.longitude}-${city.name}-${index}`}
									onClick={() => handleSuggestionClick(city)}
									className={`${styles.suggestionItem} ${textColor}`}>
									{city.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
