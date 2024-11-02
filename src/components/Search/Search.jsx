import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Search.module.css';

import lightIcon from '../../../public/assets/icons/light/search.png';
import darkIcon from '../../../public/assets/icons/dark/search.png';

const Search = ({ onLatitudeChange, onLongitudeChange, darkMode }) => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');
	const suggestionsRef = useRef(null);

	const fetchCities = async (query) => {
		const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

		if (!apiKey) {
			setError('API key is not set');
			return;
		}

		const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${apiKey}&limit=5`;

		try {
			setError('');
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			const placeSuggestions = data.features.map((place) => {
				const { properties, geometry } = place;

				return {
					name: properties.formatted,
					state: properties.state || '',
					country: properties.country || '',
					latitude: geometry.coordinates[1],
					longitude: geometry.coordinates[0],
				};
			});

			setSuggestions(placeSuggestions.slice(0, 5));
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
		setInputValue(city.name);
		onLatitudeChange(city.latitude);
		onLongitudeChange(city.longitude);
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
	const textColor = darkMode ? styles.darkText : styles.lightText;
	const icon = darkMode ? darkIcon : lightIcon;

	return (
		// No changes here, so everything from return () remains as you wanted
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
									key={city.latitude + city.longitude}
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
