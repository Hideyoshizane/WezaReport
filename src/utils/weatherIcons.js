import sunnyLightIcon from '../../public/assets/icons/light/sunny.png';
import sunnyDarkIcon from '../../public/assets/icons/dark/sunny.png';
import cloudyLightIcon from '../../public/assets/icons/light/cloudy.png';
import cloudyDarkIcon from '../../public/assets/icons/dark/cloudy.png';
import rainyLightIcon from '../../public/assets/icons/light/rainy.png';
import rainyDarkIcon from '../../public/assets/icons/dark/rainy.png';
import snowLightIcon from '../../public/assets/icons/light/snow.png';
import snowDarkIcon from '../../public/assets/icons/dark/snow.png';
import snowstormLightIcon from '../../public/assets/icons/light/snowstorm.png';
import snowstormDarkIcon from '../../public/assets/icons/dark/snowstorm.png';
import stormLightIcon from '../../public/assets/icons/light/storm.png';
import stormDarkIcon from '../../public/assets/icons/dark/storm.png';

const weatherCategories = {
	sunny: { lightIcon: sunnyLightIcon, darkIcon: sunnyDarkIcon },
	cloudy: { lightIcon: cloudyLightIcon, darkIcon: cloudyDarkIcon },
	rainy: { lightIcon: rainyLightIcon, darkIcon: rainyDarkIcon },
	snow: { lightIcon: snowLightIcon, darkIcon: snowDarkIcon },
	snowstorm: { lightIcon: snowstormLightIcon, darkIcon: snowstormDarkIcon },
	storm: { lightIcon: stormLightIcon, darkIcon: stormDarkIcon },
};

const weatherCodeToCategory = {
	0: 'sunny',
	1: 'cloudy',
	2: 'cloudy',
	3: 'cloudy',
	45: 'cloudy',
	48: 'cloudy',
	51: 'rainy',
	53: 'rainy',
	55: 'rainy',
	56: 'rainy',
	57: 'rainy',
	61: 'rainy',
	63: 'rainy',
	65: 'rainy',
	66: 'rainy',
	67: 'rainy',
	71: 'snow',
	73: 'snow',
	75: 'snow',
	77: 'snow',
	80: 'rainy',
	81: 'rainy',
	82: 'rainy',
	85: 'snowstorm',
	86: 'snowstorm',
	95: 'storm',
	96: 'storm',
	99: 'storm',
};

export const useWeatherIcon = (code, darkMode) => {
	const category = weatherCodeToCategory[code] || 'sunny';
	const icon = darkMode ? weatherCategories[category].darkIcon : weatherCategories[category].lightIcon;

	return { icon, category };
};
