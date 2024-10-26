import React from 'react';
import Image from 'next/image';

import styles from './index.module.css';
import indexBackground from '../../../public/assets/background/index.jpg'; //https://unsplash.com/@tomonogi source

const IndexPageComponent = () => {
	return (
		<div className={styles.background}>
			<div className={styles.imageWrapper}>
				<Image
					src={indexBackground}
					alt="A scenic beach image by Karori Production" // More descriptive alt text
					layout="fill" // Use layout="fill" for background image
					objectFit="cover" // Cover ensures the image covers the div
					priority // Optional: Loads the image faster
				/>
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
