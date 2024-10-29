export const findClosestTimestampIndex = (timestamps) => {
	const currentTime = new Date();
	let closestIndex = -1;
	let smallestDiff = Infinity;

	timestamps.forEach((timestamp, index) => {
		const time = new Date(timestamp);
		const diff = Math.abs(currentTime - time);

		if (diff < smallestDiff) {
			smallestDiff = diff;
			closestIndex = index;
		}
	});

	return closestIndex;
};
