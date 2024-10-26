import React from 'react';
import UVIndex from '../src/components/UV/UVIndex';
import AirQuality from '../src/components/AirQuality/AirQuality';
import '../styles/globals.css';

export default function Main() {
	return (
		<div>
			<AirQuality AQI={150} darkMode={true} />
		</div>
	);
}

//<AirQuality AQI={150} darkMode={false} />
//<UVIndex uvValue={7} darkMode={false} />;
