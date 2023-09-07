export const concatenateErrorMessages = (data: Record<string, string[]>): string => {
	let allErrorMessages = '';

	for (const key in data) {
		if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
			const errorMessages = data[key].join(' ');
			allErrorMessages += errorMessages + ' ';
		}
	}

	return allErrorMessages.trim(); // Remove trailing space before returning
};
