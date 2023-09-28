import { World } from '../World';
import { Vec2 } from '../models/Vec2';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';

export class Info extends WorldObject {
	zoom = '100 %';
	mousePosFrame = '0, 0';
	size = 'w: 0 , h: 0 (1:1)';
	sizeRatio = '1:1';

	constructor() {
		super('Info');
	}

	isInsideHitBox(pos: Vec2): boolean {
		return false;
	}

	toExternalModel(): object {
		throw new Error('Method not implemented.');
	}

	getBoundingBoxRect(): WorldObjectRect {
		throw new Error('Method not implemented.');
	}

	onUpdate(w: Readonly<World>): void {
		this.zoom = `${w.zoomLevel * 100} %`;
		this.mousePosFrame = `${w.mouse.posFrame.x.toFixed(1)}, ${w.mouse.posFrame.y.toFixed(1)}`;

		const width = w.symbol?.size.x ?? 0;
		const height = w.symbol?.size.y ?? 0;

		const a = width / height;

		let rw = 1;
		let rh = 1;

		if (a < 1) {
			rh = 1 / a;
		} else if (a > 1) {
			rw = a;
		}

		this.sizeRatio = `${rw}:${rh}`;
		this.size = `W: ${width} H: ${height} (${this.sizeRatio})`;
	}

	onDraw(ctx: CanvasRenderingContext2D): void {
		if (this.hidden) return;

		ctx.fillStyle = '#16a34a';
		ctx.font = '25px Roboto';
		// ctx.shadowBlur = 10;
		// ctx.shadowColor = '#44403c';

		ctx.fillText(this.zoom, 20, 40);

		ctx.fillText(this.size, 20, 40 + 30);
		ctx.fillText(this.mousePosFrame, 20, 40 + 30 * 2);
	}
}
