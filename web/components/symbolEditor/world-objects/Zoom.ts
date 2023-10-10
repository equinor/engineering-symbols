import { World } from '../World';
import { Vec2 } from '../models/Vec2';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';

export class Zoom extends WorldObject {
	zoomLevel = 1;
	buttonWidth = 29;
	buttonHeight = 29;
	popupWidth = 480;
	popupShift = 70;
	zoomOutY = 35;
	zoomInY = 70;
	canvas!: HTMLCanvasElement;
	mouse!: {
		pos: Vec2;
		posLast: Vec2;
		posFrame: Vec2;
		posFrameNearestPx: Vec2;
		posFrameNearestPx05: Vec2;
		isInCanvas: boolean;
		isLeftButtonDown: boolean;
		isMoving: boolean;
		leftButtonClicked: Vec2 | null;
	};

	constructor() {
		super('Zoom');
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
		// console.log(9)
	}

	onClick(w: Readonly<World>): void {
		const { width } = w.canvas;
		const { x, y }: { x: number; y: number } = w.mouse.leftButtonClicked as Vec2;
		const containerPadding = (window.innerWidth - width) / 2;
		const left = containerPadding + (width - this.popupWidth) - this.popupShift;

		// Check if the click is inside the Zoom In button
		if (x >= left && x <= left + this.buttonWidth && y >= this.zoomInY && y <= this.zoomInY + this.buttonHeight) {
			// Handle Zoom In button click
			// console.log('Zoom In button clicked', this.zoomLevel);
			w.setZoomLevel(1);
		}

		// Check if the click is inside the Zoom Out button
		if (x >= left && x <= left + this.buttonWidth && y >= this.zoomOutY && y <= this.zoomOutY + this.buttonHeight) {
			// Handle Zoom Out button click
			// console.log('Zoom Out button clicked', this.zoomLevel);
			w.setZoomLevel(-1);
		}
	}

	onDraw(ctx: CanvasRenderingContext2D): void {
		// Draw Zoom In button
		const { width } = ctx.canvas;
		const borderColor = '#BEC2C5';
		const backgroundColor = '#BEC2C5';
		const fontColor = '#ffffff';

		const containerPadding = (window.innerWidth - width) / 2;
		const left = containerPadding + (width - this.popupWidth) - this.popupShift;

		const zoomOutX = left;

		const zoomInX = left;

		const plusTextWidth = ctx.measureText('+').width;
		const minusTextWidth = ctx.measureText('—').width;

		// Draw Zoom In button
		ctx.beginPath();
		ctx.rect(zoomInX, this.zoomInY, this.buttonWidth, this.buttonHeight);
		ctx.fillStyle = backgroundColor;
		ctx.fill();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = borderColor; // Border color
		ctx.setLineDash([]);
		ctx.stroke();
		ctx.fillStyle = fontColor;
		ctx.font = 'bold 25px Roboto';
		ctx.fillText('+', zoomInX + (this.buttonWidth - plusTextWidth - 3) / 2, this.zoomInY + (this.buttonHeight + 16) / 2); // Button text (plus sign)
		ctx.closePath();

		// Draw Zoom Out button
		ctx.beginPath();
		ctx.rect(zoomOutX, this.zoomOutY, this.buttonWidth, this.buttonHeight);
		ctx.fillStyle = backgroundColor;
		ctx.fill();
		ctx.strokeStyle = borderColor; // Border color
		ctx.lineWidth = 1.5;
		ctx.setLineDash([]);
		ctx.stroke();
		ctx.fillStyle = fontColor;
		ctx.font = 'bold 25px Roboto';
		ctx.fillText('-', zoomOutX + (this.buttonWidth - minusTextWidth + 7) / 2, this.zoomOutY + (this.buttonHeight + 19) / 2); // Button text (minus sign)
		ctx.closePath();
	}
}
