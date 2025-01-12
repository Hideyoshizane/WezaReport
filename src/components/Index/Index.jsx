import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

import styles from './index.module.css';
import indexBackground from '../../../public/assets/background/index.webp';

const IndexPageComponent = () => {
	return (
		<div className={styles.background}>
			<Head>
				<title>WezaReport</title>
				<meta name="description" content="WezaReport provides accurate weather and location-based insights." />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<div className={styles.imageWrapper}>
				<Image src={indexBackground} alt="A scenic beach image" fill objectFit="cover" priority />
			</div>
			<main className={styles.center}>
				<section style={{ textAlign: 'center' }}>
					<h1>For a better user experience, please allow us to use your location.</h1>
					<h1>If not allowed, a default value will be used.</h1>
				</section>
			</main>
		</div>
	);
};

export default IndexPageComponent;
