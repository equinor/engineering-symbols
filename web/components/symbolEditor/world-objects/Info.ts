import { World } from '../World';
import { Vec2 } from '../models/Vec2';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';

const lockPath =
	'M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z';

export class Info extends WorldObject {
	onClick(w: Readonly<World>): void {
		// console.log('Method not implemented.');
	}
	zoom = '100 %';
	mousePosFrame = '0, 0';
	size = 'w: 0 , h: 0 (1:1)';
	sizeRatio = '1:1';

	lockPath = new Path2D(lockPath);
	readOnly = false;

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
		this.readOnly = w.readOnly;
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
		this.size = `W ${width} H ${height} (${this.sizeRatio})`;
	}

	onDraw(ctx: CanvasRenderingContext2D): void {
		if (this.hidden) return;

		ctx.fillStyle = '#44403c';
		ctx.font = '25px Roboto';

		ctx.fillText(this.zoom, 20, 40);
		ctx.fillText(this.size, 20, 40 + 30);

		ctx.font = '18px Roboto';
		ctx.fillText(this.mousePosFrame, 20, 40 + 30 * 2);

		if (this.readOnly) {
			ctx.translate(20, 40 + 30 * 4);
			ctx.scale(0.05, 0.05);
			ctx.globalAlpha = 1.0;
			ctx.fillStyle = '#44403c';
			ctx.fill(this.lockPath);
		}
	}
}
