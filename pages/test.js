import React, { useState } from 'react';

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
import Location from '@/components/Location/Location';
import Search from '@/components/Search/Search';
import UsaModeToggle from '@/components/UsaModeToggle/UsaModeToggle';

import placeholderData from '../placeholder.json';
import Airquality from '../Airquality.json';

import '../styles/globals.css';

export default function Main() {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [usaMode, setUsaMode] = useState(false);

	const handleLatitudeChange = (newLatitude) => {
		setLatitude(newLatitude);
	};

	const handleLongitudeChange = (newLongitude) => {
		setLongitude(newLongitude);
	};

	const handleDarkModeChange = (newDarkMode) => {
		setDarkMode(newDarkMode);
	};

	const handleUsaModeChange = (newUsaMode) => {
		setUsaMode(newUsaMode);
	};

	return (
		<div>
			<UsaModeToggle onUsaModeChange={handleUsaModeChange} usaMode={false} darkMode={true} />
			<UsaModeToggle onUsaModeChange={handleUsaModeChange} usaMode={false} darkMode={false} />
		</div>
	);
}
//<Search darkMode={true} onLatitudeChange={handleLatitudeChange} onLongitudeChange={handleLongitudeChange} />
/*<Today
time={placeholderData.current.time}
code={placeholderData.current.weather_code}
maxTemp={placeholderData.daily.temperature_2m_max[0]}
lowTemp={placeholderData.daily.temperature_2m_min[0]}
apparentTemp={placeholderData.current.apparent_temperature}
	darkMode={false}
	usaMode={false}
/> OK*/
/*		<TemperatureChart
				time={placeholderData.hourly.time.slice(0, 24)}
				temperature={placeholderData.hourly.temperature_2m.slice(0, 24)}
				darkMode={false}
				usaMode={false}
			/>
/>;*/
// <Sunrise sunriseTime={placeholderData.daily.sunrise[0]} darkMode={false} />;
// <Sunset sunsetTime={placeholderData.daily.sunset[0]} darkMode={false} />;
//<Pressure pressurehPa={placeholderData.current.surface_pressure} darkMode={true} />;
//<Visibility hourly={placeholderData.hourly.time} visibility={placeholderData.hourly.visibility} darkMode={true} />
// <UVIndex uvValue={placeholderData.daily.uv_index_max[0]} darkMode={false} />;
//<AirQuality AQI={Airquality.current.us_aqi} darkMode={false} />
// <RainProbability percentage={placeholderData.daily.precipitation_probability_max[0]} darkMode={false} />
// <Humidity percentage={placeholderData.current.relative_humidity_2m} darkMode={true} />
/*			<Wind
				windSpeed={placeholderData.current.wind_speed_10m}
				windDirection={placeholderData.current.wind_direction_10m}
				darkMode={false}
				c
			/>*/
/*			<ForecastGroup
				currentDate={placeholderData.current.time}
				WeatherData={placeholderData.daily}
				darkMode={false}
				usaMode={true}
			/>*/
//<Location latitude={placeholderData.latitude} longitude={placeholderData.longitude} darkMode={false} />
