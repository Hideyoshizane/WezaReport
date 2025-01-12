import sunnyLightIcon from '../../public/assets/icons/light/sunny.webp';
import sunnyDarkIcon from '../../public/assets/icons/dark/sunny.webp';
import cloudyLightIcon from '../../public/assets/icons/light/cloudy.webp';
import cloudyDarkIcon from '../../public/assets/icons/dark/cloudy.webp';
import rainyLightIcon from '../../public/assets/icons/light/rainy.webp';
import rainyDarkIcon from '../../public/assets/icons/dark/rainy.webp';
import snowLightIcon from '../../public/assets/icons/light/snow.webp';
import snowDarkIcon from '../../public/assets/icons/dark/snow.webp';
import snowstormLightIcon from '../../public/assets/icons/light/snowstorm.webp';
import snowstormDarkIcon from '../../public/assets/icons/dark/snowstorm.webp';
import stormLightIcon from '../../public/assets/icons/light/storm.webp';
import stormDarkIcon from '../../public/assets/icons/dark/storm.webp';

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
