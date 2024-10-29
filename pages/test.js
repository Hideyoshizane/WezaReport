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
import TemperatureChart from '@/components/TemperatureChart/TemperatureChart';
import Today from '@/components/Today/Today';

import placeholderData from '../placeholder.json';

import '../styles/globals.css';

export default function Main() {
	return <div></div>;
}
/*<Today
	time={placeholderData.current.time}
	code={placeholderData.current.weather_code}
	maxTemp={placeholderData.daily.temperature_2m_max[0]}
	lowTemp={placeholderData.daily.temperature_2m_min[0]}
	apparentTemp={placeholderData.current.apparent_temperature}
	darkMode={false}
	usaMode={false}
/>*/
/*	<TemperatureChart
time={Object.hourly.time.slice(0, 24)}
temperature={Object.temperature_2m.slice(0, 24)}
darkMode={false}
usaMode={false}
/>;*/
//<Sunrise sunriseTime={'2024-10-25T14:30:00Z'} darkMode={true} />;
//<Pressure pressurehPa={1016} darkMode={true} />;
//<Visibility distance={7} darkMode={true} />;
//<UVIndex uvValue={7} darkMode={false} />;
//<AirQuality AQI={150} darkMode={false} />
//<RainProbability percentage={15} darkMode={false} />
//<Humidity percentage={100} darkMode={true} />
//<Wind windSpeed={100} windDirection={150} darkMode={false} usaMode={false} />;
//<ForecastGroup currentDate={'2024-10-26T14:30:00Z'} WeatherData={Object} darkMode={false} usaMode={false} />;
