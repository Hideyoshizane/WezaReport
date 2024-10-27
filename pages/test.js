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
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import ForecastGroup from '@/components/ForecastGroup/ForecastGroup';
import '../styles/globals.css';

const Object = {
	time: [],
	weatherCode: {
		0: 3,
		1: 0,
		2: 1,
		3: 53,
		4: 71,
		5: 85,
		6: 99,
	},
	temperature2mMax: {
		0: 29.243499755859375,
		1: 28.743499755859375,
		2: 27.956501007080078,
		3: 28.506500244140625,
		4: 28.9064998626709,
		5: 27.956501007080078,
		6: 28.056499481201172,
	},
	temperature2mMin: {
		0: 16.943500518798828,
		1: 14.893499374389648,
		2: 17.043498992919922,
		3: 22.006500244140625,
		4: 22.4064998626709,
		5: 20.706501007080078,
		6: 21.006500244140625,
	},
	uvIndexMax: null,
	precipitationProbabilityMax: null,
};

export default function Main() {
	return (
		<div>
			<ForecastGroup currentDate={'2024-10-26T14:30:00Z'} WeatherData={Object} darkMode={false} usaMode={false} />;
			<ForecastGroup currentDate={'2024-10-26T14:30:00Z'} WeatherData={Object} darkMode={true} usaMode={false} />;
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
