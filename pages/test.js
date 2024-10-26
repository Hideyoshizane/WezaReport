import React from 'react';
import UVIndex from '../src/components/UV/UVIndex';
import '../styles/globals.css'; // Import the global CSS file

export default function Main() {
	return (
		<div>
			<UVIndex uvValue={7} darkMode={false} />
			<UVIndex uvValue={7} darkMode={true} />
		</div>
	);
}
