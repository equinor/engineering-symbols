export const rotatePoint = (point: { x: number; y: number }, rotation: number, width: number, height: number, scale: number = 1) => {
	// Rotate position
	const ax = width / 2;
	const ay = height / 2;

	const rad = (Math.PI / 180) * -rotation;

	const run = (point.x - ax) * scale;
	const rise = (point.y - ay) * scale;

	const cx = Math.cos(rad) * run + Math.sin(rad) * rise + ax;
	const cy = Math.cos(rad) * rise - Math.sin(rad) * run + ay;

	return { x: cx, y: cy };
};
