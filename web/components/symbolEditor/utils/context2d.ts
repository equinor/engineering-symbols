export function resetScale(ctx: CanvasRenderingContext2D) {
	ctx.resetTransform();
	//ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
