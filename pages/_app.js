import { CoordinatesProvider } from '@/contexts/CoordinatesContext';

function MyApp({ Component, pageProps }) {
	return (
		<CoordinatesProvider>
			<Component {...pageProps} />
		</CoordinatesProvider>
	);
}

export default MyApp;
