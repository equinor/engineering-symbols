import { World } from '../World';
import { Vec2 } from './Vec2';

export type WorldObjectRect = {
	origin: Vec2;
	width: number;
	height: number;
};

export type WorldObjectType = 'Generic' | 'Connector' | 'Label' | 'CenterOfRotation' | 'Cursor' | 'Origin';

export abstract class WorldObject {
	readonly key: string;
	type: WorldObjectType = 'Generic';
	hidden = false;
	isSelectable = false;
	isSelected = false;
	isMouseOver = false;
	isDraggable = false;
	isMoving = false;
	isGrabbed = false;
	isGrabStarted = false;
	/** TRUE (once) when object was dragged to a new position (after mouse up) */
	wasDragged = false;
	posDragStart: Vec2 | null = null;
	posDragEnd: Vec2 | null = null;
	posFrame = new Vec2(10, 10);
	posFrameLast = new Vec2(10, 10);
	posClient = new Vec2(10, 10);

	constructor(key: string) {
		this.key = key;
	}

	abstract onUpdate(w: Readonly<World>): void;
	abstract onDraw(ctx: CanvasRenderingContext2D): void;
	abstract isInsideHitBox(pos: Vec2): boolean;
	abstract toExternalModel(w: Readonly<World>): object;
	abstract getBoundingBoxRect(): WorldObjectRect;

	update(w: Readonly<World>): void {
		if (this.isSelectable && this.isDraggable) {
			this.moveOnGrab(w);
		}

		this.posClient = w.frame.origin.add(this.posFrame.scale(w.zoomLevel));

		this.isMouseOver = this.isInsideHitBox(w.mouse.pos);

		if (this.isSelectable && w.mouse.leftButtonClicked !== null) {
			this.handleLeftButtonClicked(w, w.mouse.leftButtonClicked);
		}

		this.onUpdate(w);

		this.posFrameLast = this.posFrame.clone();
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.onDraw(ctx);

		if (this.isSelectable && (this.isMouseOver || this.isSelected)) {
			const color = this.isSelected ? '#dc2626' : 'grey';
			// Note: Could cache this for static bb's
			const bb = this.getBoundingBoxRect();
			drawSelectionBox(ctx, bb, color);
		}
	}

	private moveOnGrab(w: Readonly<World>): void {
		if (
			!this.isGrabStarted &&
			this.isSelected &&
			w.mouse.isLeftButtonDown &&
			w.selectedWorldObjects.length === 1 &&
			this.isMouseOver // Note: from last frame
		) {
			this.isGrabStarted = true;
		} else if (this.isGrabStarted && !w.mouse.isLeftButtonDown) {
			this.isGrabStarted = false;
		}

		this.wasDragged = false;

		this.isGrabbed = this.isSelected && this.isGrabStarted && w.mouse.isLeftButtonDown;

		this.isMoving = this.isGrabbed && w.mouse.isMoving;

		if (this.isMoving) {
			this.posFrame = w.mouse.posFrameNearestPx05.clone();
		}

		if (w.events.mouse.up && this.isSelected) {
			if (this.posDragStart?.equals(this.posFrame)) {
				this.posDragStart = null;
				this.posDragEnd = null;
			} else {
				this.posDragEnd = this.posFrame.clone();
			}
		}

		if (w.events.mouse.down && this.isSelected) {
			this.posDragStart = this.posFrame.clone();
			this.posDragEnd = null;
		}

		if (this.posDragStart && this.posDragEnd) {
			// Connector position has changed!
			this.wasDragged = true;
			this.posDragStart = null;
			this.posDragEnd = null;
		}
	}

	private handleLeftButtonClicked(w: Readonly<World>, posClicked: Vec2): void {
		const hit = this.isInsideHitBox(posClicked);

		const existingIndex = w.selectedWorldObjects.indexOf(this);

		const anotherObjInSamePos = w.selectedWorldObjects.find((c) => c.posFrame.equals(this.posFrame) && c.key !== this.key) !== undefined;

		if (hit && !anotherObjInSamePos) {
			this.isSelected = true;
			if (w.selectedWorldObjects.length === 0 || existingIndex < 0) {
				w.selectedWorldObjects.push(this);
				w.events.worldObjects.selectionChanged = true;
			}
		} else if (!w.keys.ctrlLeft.isDown) {
			this.isSelected = false;
			if (existingIndex >= 0) {
				w.selectedWorldObjects.splice(existingIndex, 1);
				w.events.worldObjects.selectionChanged = true;
			}
		}
	}
}

function getSelectionBorderPattern(length: number): number[] {
	// Example (nb = 3):
	//   a   d  b  d  b  d  b  d   a
	// -----   ---   ---   ---   -----

	const a = 7; // Corner length
	const b = 7; // Middle bars length
	const dMin = 4; // Minimum length of space between bars

	const c = length - 2 * a;

	if (c < dMin) {
		throw new Error('No gap possible!');
	}

	let nb = 0; // Number of bars between corners
	let d = c; // Gap between bars

	while (nb < 10000) {
		const n = nb + 1;
		const dNext = (c - n * b) / (1 + n);

		if (dNext < dMin) {
			break;
		}

		d = dNext;
		nb = n;
	}

	const res = [];

	res.push(a);

	if (nb === 0) {
		res.push(d);
	} else {
		for (let i = 0; i < nb; i++) {
			res.push(d);
			res.push(b);
		}
		res.push(d);
	}

	res.push(a);

	return res;
}

function drawSelectionBox(ctx: CanvasRenderingContext2D, wRect: WorldObjectRect, color: string) {
	const ph = getSelectionBorderPattern(wRect.width);
	const pv = wRect.height === wRect.width ? [...ph] : getSelectionBorderPattern(wRect.height);

	const lw = 2;
	const a = lw / 2;

	// Increase horizontal end gaps
	ph[0] += a;
	ph[ph.length - 1] += a;

	ctx.strokeStyle = color;
	ctx.lineWidth = lw;

	// Top horizontal
	ctx.beginPath(); // Start a new path
	ctx.moveTo(wRect.origin.x - a, wRect.origin.y);
	ctx.lineTo(wRect.origin.x + wRect.width + a, wRect.origin.y);
	ctx.setLineDash(ph);
	ctx.stroke();

	// Bottom horizontal
	ctx.beginPath();
	ctx.moveTo(wRect.origin.x - a, wRect.origin.y + wRect.height);
	ctx.lineTo(wRect.origin.x + wRect.width + a, wRect.origin.y + wRect.height);
	ctx.setLineDash(ph);
	ctx.stroke();

	// Left vertical
	ctx.beginPath();
	ctx.moveTo(wRect.origin.x, wRect.origin.y);
	ctx.lineTo(wRect.origin.x, wRect.origin.y + wRect.height);
	ctx.setLineDash(pv);
	ctx.stroke();

	// Right vertical
	ctx.beginPath();
	ctx.moveTo(wRect.origin.x + wRect.width, wRect.origin.y);
	ctx.lineTo(wRect.origin.x + wRect.width, wRect.origin.y + wRect.height);
	ctx.setLineDash(pv);
	ctx.stroke();
}
