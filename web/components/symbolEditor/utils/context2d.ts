export function resetScale(ctx: CanvasRenderingContext2D) {
	ctx.resetTransform();
	//ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

export function drawRoundedRectangle(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	cornerRadius: number,
	fillStyle: string,
	strokeStyle: string,
	lineWidth = 1,
	lineDash = []
) {
	// Start a new path
	ctx.beginPath();

	// Move to the start point
	ctx.moveTo(x + cornerRadius, y);

	// Draw the four sides and corners
	ctx.lineTo(x + width - cornerRadius, y);
	ctx.arc(x + width - cornerRadius, y + cornerRadius, cornerRadius, -Math.PI / 2, 0, false);
	ctx.lineTo(x + width, y + height - cornerRadius);
	ctx.arc(x + width - cornerRadius, y + height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
	ctx.lineTo(x + cornerRadius, y + height);
	ctx.arc(x + cornerRadius, y + height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
	ctx.lineTo(x, y + cornerRadius);
	ctx.arc(x + cornerRadius, y + cornerRadius, cornerRadius, Math.PI, Math.PI * 1.5, false);

	// Close the path
	ctx.closePath();

	// Fill the shape
	ctx.fillStyle = fillStyle;
	ctx.fill();

	// Stroke the shape
	ctx.lineWidth = lineWidth;
	ctx.setLineDash(lineDash);
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}
