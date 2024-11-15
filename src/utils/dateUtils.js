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

export const formatISOToTime = (isoString) => {
	if (!isoString) return 'No Data'; // Check for null or undefined

	const date = new Date(isoString);
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
};

export function formatTimeArray(timeArray) {
	return timeArray.map((time) => {
		const date = new Date(time); // Convert to Date object
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false, // 24-hour format
		});
	});
}
