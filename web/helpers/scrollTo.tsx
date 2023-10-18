const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
};

export const scrollTo = (element: HTMLElement, to: number, duration: number): void => {
	console.log(777);
	const start = element.scrollTop;
	const change = to - start;
	let currentTime = 0;
	const increment = 20;

	const animateScroll = (): void => {
		currentTime += increment;
		const val = easeInOutQuad(currentTime, start, change, duration);
		element.scrollTop = val;
		if (currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	};

	animateScroll();
};
