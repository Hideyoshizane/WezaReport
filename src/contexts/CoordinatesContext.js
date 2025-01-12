import React, { createContext, useContext, useState, useMemo } from 'react';

const CoordinatesContext = createContext();

export const CoordinatesProvider = ({ children }) => {
	const [coordinates, setCoordinates] = useState({
		latitude: 28.41601261753784, // default latitude (e.g., Walt Disney World, FL)
		longitude: -81.5811970806693, // default longitude
	});

	const updateCoordinates = ({ latitude, longitude }) => {
		setCoordinates({ latitude, longitude });
	};

	// Memoize the context value to avoid unnecessary re-renders
	const value = useMemo(() => ({ coordinates, updateCoordinates }), [coordinates]);

	return <CoordinatesContext.Provider value={value}>{children}</CoordinatesContext.Provider>;
};

export const useCoordinates = () => useContext(CoordinatesContext);
