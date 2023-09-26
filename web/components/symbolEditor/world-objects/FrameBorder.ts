import { World } from '../World';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';
import { Vec2 } from '../models/Vec2';

export class FrameBorder extends WorldObject {
	frameOrigin = new Vec2(0, 0);
	frameScreenSize = new Vec2(0, 0);

	color = '#c2410c';

	constructor() {
		super('FrameBorder');
		this.hidden = true;
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
		this.hidden = !(w.symbol && w.showGuides);
		this.frameOrigin = w.frame.origin.clone();
		this.frameScreenSize = w.frame.screenSize.clone();
	}

	onDraw(ctx: CanvasRenderingContext2D): void {
		if (this.hidden) return;

		ctx.strokeStyle = this.color;
		ctx.setLineDash([15, 5]);
		ctx.strokeRect(this.frameOrigin.x, this.frameOrigin.y, this.frameScreenSize.x, this.frameScreenSize.x);

		ctx.beginPath();
		ctx.arc(this.frameOrigin.x, this.frameOrigin.y, 3, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.font = '15px Roboto';
		ctx.fillText('(0, 0)', this.frameOrigin.x - 20, this.frameOrigin.y - 10);
	}
}
