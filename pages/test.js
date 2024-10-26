import React from 'react';
import UVIndex from '@/components/UVIndex/UVIndex';
import AirQuality from '@/components/AirQuality/AirQuality';
import RainProbability from '@/components/RainProbability/RainProbability';
import Humidity from '@/components/Humidity/Humidity';
import '../styles/globals.css';

export default function Main() {
	return (
		<div>
			<Humidity percentage={100} darkMode={false} />
		</div>
	);
}

//<Humidity percentage={100} darkMode={true} />
//<RainProbability percentage={15} darkMode={false} />
//<AirQuality AQI={150} darkMode={false} />
//<UVIndex uvValue={7} darkMode={false} />;
