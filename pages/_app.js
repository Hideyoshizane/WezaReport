import { CoordinatesProvider } from '@/contexts/CoordinatesContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CoordinatesProvider>
				<Component {...pageProps} />
			</CoordinatesProvider>
		</>
	);
}

export default MyApp;
