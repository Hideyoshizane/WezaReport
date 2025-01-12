import { CoordinatesProvider } from '@/contexts/CoordinatesContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>WezaReport, a Bentou UI Weather App</title>
				<meta name="description" content="This is a Weather App build in React using the Bentou UI Design Style" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CoordinatesProvider>
				<Component {...pageProps} />
			</CoordinatesProvider>
		</>
	);
}

export default MyApp;
