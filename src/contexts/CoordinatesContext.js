import React, { createContext, useContext, useState } from 'react';

const CoordinatesContext = createContext();

export const CoordinatesProvider = ({ children }) => {
	const [coordinates, setCoordinates] = useState({
		latitude: null,
		longitude: null,
	});

	const updateCoordinates = ({ latitude, longitude }) => {
		setCoordinates({ latitude, longitude });
	};

	return (
		<CoordinatesContext.Provider value={{ coordinates, updateCoordinates }}>{children}</CoordinatesContext.Provider>
	);
};

export const useCoordinates = () => useContext(CoordinatesContext);
