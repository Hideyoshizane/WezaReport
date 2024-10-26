import React from 'react';
import UVIndex from '@/components/UVIndex/UVIndex';
import AirQuality from '@/components/AirQuality/AirQuality';
import RainProbability from '@/components/RainProbability/RainProbability';
import Humidity from '@/components/Humidity/Humidity';
import Wind from '@/components/Wind/Wind';
import '../styles/globals.css';

export default function Main() {
	return (
		<div>
			<UVIndex uvValue={7} darkMode={false} />;
			<AirQuality AQI={150} darkMode={false} />
			<RainProbability percentage={15} darkMode={false} />
			<Humidity percentage={100} darkMode={true} />
			<Wind windSpeed={100} windDirection={150} darkMode={false} usaMode={false} />;
		</div>
	);
}
//<UVIndex uvValue={7} darkMode={false} />;
//<AirQuality AQI={150} darkMode={false} />
//<RainProbability percentage={15} darkMode={false} />
//<Humidity percentage={100} darkMode={true} />
//<Wind windSpeed={100} windDirection={150} darkMode={false} usaMode={false} />;
