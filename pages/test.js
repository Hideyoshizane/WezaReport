import React from 'react';
import UVIndex from '../src/components/UVIndex/UVIndex';
import AirQuality from '../src/components/AirQuality/AirQuality';
import RainProbability from '../src/components/RainProbability/RainProbability';
import '../styles/globals.css';

export default function Main() {
	return (
		<div>
			<RainProbability percentage={15} darkMode={false} />
			<RainProbability percentage={100} darkMode={true} />
		</div>
	);
}

//<AirQuality AQI={150} darkMode={false} />
//<UVIndex uvValue={7} darkMode={false} />;
