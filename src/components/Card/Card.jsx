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
import ForecastGroup from '@/components/ForecastGroup/ForecastGroup';
import TemperatureChart from '@/components/TemperatureChart/TemperatureChart';
import Today from '@/components/Today/Today';

import Location from '@/components/Location/Location';
import Menu from '@/components/Menu/Menu';

import styles from './Card.module.css';

const Card = ({ dataObject, airObject, handleSetCoordinates, onSetDarkMode, onSetUsaMode, usaMode, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;
	return (
		<div className={containerStyle}>
			<div className={styles.parent}>
				<div className={styles.div1}>
					<Location latitude={dataObject.latitude} longitude={dataObject.longitude} darkMode={darkMode} />
				</div>
				<div className={styles.div2}>
					<Menu
						handleSetCoordinates={handleSetCoordinates}
						onDarkModeChange={onSetDarkMode}
						onUsaModeChange={onSetUsaMode}
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				</div>
				<div className={styles.div3}>
					<Today
						time={dataObject.current.time}
						code={dataObject.current.weather_code}
						maxTemp={dataObject.daily.temperature_2m_max[0]}
						lowTemp={dataObject.daily.temperature_2m_min[0]}
						apparentTemp={dataObject.current.apparent_temperature}
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				</div>
				<div className={styles.div4}>
					<ForecastGroup
						currentDate={dataObject.current.time}
						WeatherData={dataObject.daily}
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				</div>
				<div className={styles.div5}>
					<TemperatureChart
						time={dataObject.hourly.time.slice(0, 24)}
						temperature={dataObject.hourly.temperature_2m.slice(0, 24)}
						darkMode={darkMode}
						usaMode={usaMode}
					/>
				</div>
				<div className={styles.div6}>
					<UVIndex uvValue={dataObject.daily.uv_index_max[0]} darkMode={darkMode} />
				</div>
				<div className={styles.div7}>
					<Visibility hourly={dataObject.hourly.time} visibility={dataObject.hourly.visibility} darkMode={darkMode} />
				</div>
				<div className={styles.div8}>
					<Pressure pressurehPa={dataObject.current.surface_pressure} darkMode={darkMode} />;
				</div>
				<div className={styles.div9}>
					<Humidity percentage={dataObject.current.relative_humidity_2m} darkMode={darkMode} />
				</div>
				<div className={styles.div10}>
					<RainProbability percentage={dataObject.daily.precipitation_probability_max[0]} darkMode={darkMode} />
				</div>
				<div className={styles.div11}>
					<AirQuality AQI={airObject.current.us_aqi} darkMode={darkMode} />
				</div>
				<div className={styles.div12}>
					<Wind
						windSpeed={dataObject.current.wind_speed_10m}
						windDirection={dataObject.current.wind_direction_10m}
						darkMode={darkMode}
					/>
				</div>
				<div className={styles.div13}>
					<Sunrise sunriseTime={dataObject.daily.sunrise[0]} darkMode={darkMode} />
				</div>
				<div className={styles.div14}>
					<Sunset sunsetTime={dataObject.daily.sunset[0]} darkMode={darkMode} />
				</div>
			</div>
		</div>
	);
};

export default Card;
