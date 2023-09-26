import { World } from '../World';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';
import { Vec2 } from '../models/Vec2';

export class Cursor extends WorldObject {
	mousePos = new Vec2(0, 0);
	isSpaceDown = false;
	isLeftButtonDown = false;

	constructor() {
		super('Cursor');
		this.type = 'Cursor';
	}

	isInsideHitBox(pos: Vec2): boolean {
		return false;
	}

	toExternalModel(w: Readonly<World>): object {
		throw new Error('Method not implemented.');
	}

	getBoundingBoxRect(): WorldObjectRect {
		throw new Error('Method not implemented.');
	}

	onUpdate(w: Readonly<World>): void {
		//this.hidden = !w.mouse.isInCanvas;
		this.mousePos = w.mouse.pos.clone();
		this.isSpaceDown = w.keys.space.isDown;
		this.isLeftButtonDown = w.mouse.isLeftButtonDown;
	}

	onDraw(): void {
		if (this.isSpaceDown) {
			document.body.style.userSelect = 'none';

			if (!this.isLeftButtonDown) {
				document.body.style.cursor = 'grab';
			} else {
				document.body.style.cursor = 'grabbing';
			}
		} else {
			if (document.body.style.cursor !== 'default') {
				document.body.style.cursor = 'default';
				document.body.style.removeProperty('user-select');
			}
		}
	}

	//   draw(ctx: CanvasRenderingContext2D): void {
	//     if (this.hidden) return;

	//     let cursorSymbol = pointerSymbol;
	//     let mode = 0;

	//     if (this.isSpaceDown) {
	//       mode = 1;
	//       cursorSymbol = handSymbol;
	//     }

	//     if (this.isSpaceDown && this.isLeftButtonDown) {
	//       mode = 2;
	//       cursorSymbol = handGrabbingSymbol;
	//     }

	//     const s = 24 / 480;
	//     const d = mode > 0 ? 12 : 0;

	//     ctx.translate(this.mousePos.x - d, this.mousePos.y - d);
	//     ctx.scale(s, s);

	//     ctx.fillStyle = "white";
	//     ctx.fill(cursorSymbol);
	//   }
}
