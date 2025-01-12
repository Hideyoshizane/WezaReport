import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { popInAnimation } from '@/utils/animations';

// Lazy load components
const UVIndex = lazy(() => import('@/components/UVIndex/UVIndex'));
const AirQuality = lazy(() => import('@/components/AirQuality/AirQuality'));
const RainProbability = lazy(() => import('@/components/RainProbability/RainProbability'));
const Humidity = lazy(() => import('@/components/Humidity/Humidity'));
const Wind = lazy(() => import('@/components/Wind/Wind'));
const Visibility = lazy(() => import('@/components/Visibility/Visibility'));
const Pressure = lazy(() => import('@/components/Pressure/Pressure'));
const Sunrise = lazy(() => import('@/components/Sunrise/Sunrise'));
const Sunset = lazy(() => import('@/components/Sunset/Sunset'));
const ForecastGroup = lazy(() => import('@/components/ForecastGroup/ForecastGroup'));
const TemperatureChart = lazy(() => import('@/components/TemperatureChart/TemperatureChart'));
const Today = lazy(() => import('@/components/Today/Today'));
const Location = lazy(() => import('@/components/Location/Location'));
const Menu = lazy(() => import('@/components/Menu/Menu'));

import styles from './Card.module.css';

const Card = ({ dataObject, airObject, onSetDarkMode, onSetUsaMode, usaMode, darkMode }) => {
	const containerStyle = darkMode ? styles.darkContainer : styles.lightContainer;

	return (
		<div className={containerStyle}>
			<div className={styles.parent}>
				<div className={styles.div1}>
					<Suspense fallback={<div>Loading...</div>}>
						<Location latitude={dataObject.latitude} longitude={dataObject.longitude} darkMode={darkMode} />
					</Suspense>
				</div>
				<div className={styles.div2}>
					<Suspense fallback={<div>Loading...</div>}>
						<Menu
							onDarkModeChange={onSetDarkMode}
							onUsaModeChange={onSetUsaMode}
							darkMode={darkMode}
							usaMode={usaMode}
						/>
					</Suspense>
				</div>
				<motion.div className={styles.div3} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Today
							time={dataObject.current.time}
							code={dataObject.current.weather_code}
							maxTemp={dataObject.daily.temperature_2m_max[0]}
							lowTemp={dataObject.daily.temperature_2m_min[0]}
							apparentTemp={dataObject.current.apparent_temperature}
							darkMode={darkMode}
							usaMode={usaMode}
						/>
					</Suspense>
				</motion.div>
				<motion.div className={styles.div4} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<ForecastGroup
							currentDate={dataObject.current.time}
							WeatherData={dataObject.daily}
							darkMode={darkMode}
							usaMode={usaMode}
						/>
					</Suspense>
				</motion.div>
				<div className={styles.div5}>
					<Suspense fallback={<div>Loading...</div>}>
						<TemperatureChart
							time={dataObject.hourly.time.slice(0, 24)}
							temperature={dataObject.hourly.temperature_2m.slice(0, 24)}
							darkMode={darkMode}
							usaMode={usaMode}
						/>
					</Suspense>
				</div>
				<motion.div className={styles.div6} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<UVIndex uvValue={dataObject.daily.uv_index_max[0]} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div7} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Visibility hourly={dataObject.hourly.time} visibility={dataObject.hourly.visibility} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div8} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Pressure pressurehPa={dataObject.current.surface_pressure} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div9} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Humidity percentage={dataObject.current.relative_humidity_2m} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div10} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<RainProbability percentage={dataObject.daily.precipitation_probability_max[0]} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div11} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<AirQuality AQI={airObject.current.us_aqi} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div12} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Wind
							windSpeed={dataObject.current.wind_speed_10m}
							windDirection={dataObject.current.wind_direction_10m}
							darkMode={darkMode}
						/>
					</Suspense>
				</motion.div>
				<motion.div className={styles.div13} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Sunrise sunriseTime={dataObject.daily.sunrise[0]} darkMode={darkMode} />
					</Suspense>
				</motion.div>
				<motion.div className={styles.div14} {...popInAnimation}>
					<Suspense fallback={<div>Loading...</div>}>
						<Sunset sunsetTime={dataObject.daily.sunset[0]} darkMode={darkMode} />
					</Suspense>
				</motion.div>
			</div>
		</div>
	);
};

export default Card;
