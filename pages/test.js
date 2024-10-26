import React from 'react';
import UVIndex from '@/components/UVIndex/UVIndex';
import AirQuality from '@/components/AirQuality/AirQuality';
import RainProbability from '@/components/RainProbability/RainProbability';
import Humidity from '@/components/Humidity/Humidity';
import Wind from '@/components/Wind/Wind';
import Visibility from '@/components/Visibility/Visibility';
import Pressure from '@/components/Pressure/Pressure';
import Sunrise from '@/components/Sunrise/Sunrise';
import Sunset from '@/components/Sunset/Sunset';
import '../styles/globals.css';

export default function Main() {
	return (
		<div>
			<Sunset sunriseTime={'2024-10-25T14:30:00Z'} darkMode={false} />;
			<Sunset sunriseTime={'2024-10-25T14:30:00Z'} darkMode={true} />;
		</div>
	);
}
//<Sunrise sunriseTime={'2024-10-25T14:30:00Z'} darkMode={true} />;
//<Pressure pressurehPa={1016} darkMode={true} />;
//<Visibility distance={7} darkMode={true} />;
//<UVIndex uvValue={7} darkMode={false} />;
//<AirQuality AQI={150} darkMode={false} />
//<RainProbability percentage={15} darkMode={false} />
//<Humidity percentage={100} darkMode={true} />
//<Wind windSpeed={100} windDirection={150} darkMode={false} usaMode={false} />;
