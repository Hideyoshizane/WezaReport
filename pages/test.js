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
import '../styles/globals.css';

const Object = {
	hourly: {
		time: [
			'2024-10-28T00:00',
			'2024-10-28T01:00',
			'2024-10-28T02:00',
			'2024-10-28T03:00',
			'2024-10-28T04:00',
			'2024-10-28T05:00',
			'2024-10-28T06:00',
			'2024-10-28T07:00',
			'2024-10-28T08:00',
			'2024-10-28T09:00',
			'2024-10-28T10:00',
			'2024-10-28T11:00',
			'2024-10-28T12:00',
			'2024-10-28T13:00',
			'2024-10-28T14:00',
			'2024-10-28T15:00',
			'2024-10-28T16:00',
			'2024-10-28T17:00',
			'2024-10-28T18:00',
			'2024-10-28T19:00',
			'2024-10-28T20:00',
			'2024-10-28T21:00',
			'2024-10-28T22:00',
			'2024-10-28T23:00',
			'2024-10-29T00:00',
			'2024-10-29T01:00',
			'2024-10-29T02:00',
			'2024-10-29T03:00',
			'2024-10-29T04:00',
			'2024-10-29T05:00',
			'2024-10-29T06:00',
			'2024-10-29T07:00',
			'2024-10-29T08:00',
			'2024-10-29T09:00',
			'2024-10-29T10:00',
			'2024-10-29T11:00',
			'2024-10-29T12:00',
			'2024-10-29T13:00',
			'2024-10-29T14:00',
			'2024-10-29T15:00',
			'2024-10-29T16:00',
			'2024-10-29T17:00',
			'2024-10-29T18:00',
			'2024-10-29T19:00',
			'2024-10-29T20:00',
			'2024-10-29T21:00',
			'2024-10-29T22:00',
			'2024-10-29T23:00',
			'2024-10-30T00:00',
			'2024-10-30T01:00',
			'2024-10-30T02:00',
			'2024-10-30T03:00',
			'2024-10-30T04:00',
			'2024-10-30T05:00',
			'2024-10-30T06:00',
			'2024-10-30T07:00',
			'2024-10-30T08:00',
			'2024-10-30T09:00',
			'2024-10-30T10:00',
			'2024-10-30T11:00',
			'2024-10-30T12:00',
			'2024-10-30T13:00',
			'2024-10-30T14:00',
			'2024-10-30T15:00',
			'2024-10-30T16:00',
			'2024-10-30T17:00',
			'2024-10-30T18:00',
			'2024-10-30T19:00',
			'2024-10-30T20:00',
			'2024-10-30T21:00',
			'2024-10-30T22:00',
			'2024-10-30T23:00',
			'2024-10-31T00:00',
			'2024-10-31T01:00',
			'2024-10-31T02:00',
			'2024-10-31T03:00',
			'2024-10-31T04:00',
			'2024-10-31T05:00',
			'2024-10-31T06:00',
			'2024-10-31T07:00',
			'2024-10-31T08:00',
			'2024-10-31T09:00',
			'2024-10-31T10:00',
			'2024-10-31T11:00',
			'2024-10-31T12:00',
			'2024-10-31T13:00',
			'2024-10-31T14:00',
			'2024-10-31T15:00',
			'2024-10-31T16:00',
			'2024-10-31T17:00',
			'2024-10-31T18:00',
			'2024-10-31T19:00',
			'2024-10-31T20:00',
			'2024-10-31T21:00',
			'2024-10-31T22:00',
			'2024-10-31T23:00',
			'2024-11-01T00:00',
			'2024-11-01T01:00',
			'2024-11-01T02:00',
			'2024-11-01T03:00',
			'2024-11-01T04:00',
			'2024-11-01T05:00',
			'2024-11-01T06:00',
			'2024-11-01T07:00',
			'2024-11-01T08:00',
			'2024-11-01T09:00',
			'2024-11-01T10:00',
			'2024-11-01T11:00',
			'2024-11-01T12:00',
			'2024-11-01T13:00',
			'2024-11-01T14:00',
			'2024-11-01T15:00',
			'2024-11-01T16:00',
			'2024-11-01T17:00',
			'2024-11-01T18:00',
			'2024-11-01T19:00',
			'2024-11-01T20:00',
			'2024-11-01T21:00',
			'2024-11-01T22:00',
			'2024-11-01T23:00',
			'2024-11-02T00:00',
			'2024-11-02T01:00',
			'2024-11-02T02:00',
			'2024-11-02T03:00',
			'2024-11-02T04:00',
			'2024-11-02T05:00',
			'2024-11-02T06:00',
			'2024-11-02T07:00',
			'2024-11-02T08:00',
			'2024-11-02T09:00',
			'2024-11-02T10:00',
			'2024-11-02T11:00',
			'2024-11-02T12:00',
			'2024-11-02T13:00',
			'2024-11-02T14:00',
			'2024-11-02T15:00',
			'2024-11-02T16:00',
			'2024-11-02T17:00',
			'2024-11-02T18:00',
			'2024-11-02T19:00',
			'2024-11-02T20:00',
			'2024-11-02T21:00',
			'2024-11-02T22:00',
			'2024-11-02T23:00',
			'2024-11-03T00:00',
			'2024-11-03T01:00',
			'2024-11-03T02:00',
			'2024-11-03T03:00',
			'2024-11-03T04:00',
			'2024-11-03T05:00',
			'2024-11-03T06:00',
			'2024-11-03T07:00',
			'2024-11-03T08:00',
			'2024-11-03T09:00',
			'2024-11-03T10:00',
			'2024-11-03T11:00',
			'2024-11-03T12:00',
			'2024-11-03T13:00',
			'2024-11-03T14:00',
			'2024-11-03T15:00',
			'2024-11-03T16:00',
			'2024-11-03T17:00',
			'2024-11-03T18:00',
			'2024-11-03T19:00',
			'2024-11-03T20:00',
			'2024-11-03T21:00',
			'2024-11-03T22:00',
			'2024-11-03T23:00',
		],
	},
	temperature_2m: [
		9.2, 8.7, 8.2, 7.7, 7.1, 7.4, 7.5, 7.4, 8, 9.1, 10.5, 12.2, 14.3, 14.8, 15.5, 15.7, 15.2, 14.5, 14, 14, 13.9, 13.7,
		13.4, 13.2, 12.9, 12.6, 12.5, 12.4, 12.3, 12.1, 12, 12, 12.1, 12.5, 13, 13.5, 14.2, 14.7, 14.7, 14.6, 14.4, 14.1,
		13.7, 13.3, 13.1, 13, 12.9, 12.6, 12.2, 12.4, 12.5, 12.5, 12.5, 12.5, 12.5, 12.4, 12.6, 12.9, 13.7, 14, 14.6, 14.8,
		14.7, 14.9, 14.7, 14.1, 13.5, 13, 12.3, 12, 11.9, 11.2, 10.5, 9.8, 9.6, 9.3, 9.3, 9.2, 9.3, 9.1, 9.3, 10.1, 11.3,
		12.8, 14.2, 14.9, 15.1, 14.7, 14.3, 13.8, 13.3, 12.9, 12.6, 12.3, 12.1, 11.9, 11.8, 11.7, 11.6, 11.6, 11.6, 11.6,
		11.5, 11.5, 11.7, 12, 12.4, 12.9, 13.4, 13.8, 13.9, 13.9, 13.8, 13.5, 13.1, 12.8, 12.5, 12.3, 12.1, 11.9, 11.8,
		11.6, 11.5, 11.3, 11.2, 11.2, 11.2, 11.2, 11, 10.5, 10.1, 10.2, 10.5, 10.5, 10.2, 9.6, 8.7, 7.5, 6, 4.7, 3.7, 3,
		2.4, 1.9, 1.6, 1.3, 1.1, 1, 0.9, 0.7, 0.6, 0.7, 1.1, 1.8, 2.8, 4.3, 6, 7.2, 7.7, 7.6, 7.2, 6.1, 4.7, 3.4, 2.6, 2.1,
		1.6, 1.3,
	],
};

export default function Main() {
	return (
		<div>
			<TemperatureChart
				time={Object.hourly.time.slice(0, 24)}
				temperature={Object.temperature_2m.slice(0, 24)}
				darkMode={false}
				usaMode={false}
			/>
			<TemperatureChart
				time={Object.hourly.time.slice(0, 24)}
				temperature={Object.temperature_2m.slice(0, 24)}
				darkMode={true}
				usaMode={true}
			/>
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
//<ForecastGroup currentDate={'2024-10-26T14:30:00Z'} WeatherData={Object} darkMode={false} usaMode={false} />;
