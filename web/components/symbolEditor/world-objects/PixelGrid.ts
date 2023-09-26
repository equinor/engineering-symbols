import { World } from "../World";
import { resetScale } from "../utils/context2d";
import { WorldObject, WorldObjectRect } from "../models/WorldObject";
import { Vec2 } from "../models/Vec2";

export class PixelGrid extends WorldObject {
  offset = new Vec2(0, 0);
  clientSize = new Vec2(0, 0);
  zoomLevel = 1;

  /**
   *
   */
  constructor() {
    super("PixelGrid");
  }

  isInsideHitBox(pos: Vec2): boolean {
    return false;
  }

  toExternalModel(): object {
    throw new Error("Method not implemented.");
  }

  getBoundingBoxRect(): WorldObjectRect {
    throw new Error("Method not implemented.");
  }

  onUpdate(w: Readonly<World>): void {
    this.hidden = w.detailedMode === false;
    this.clientSize = w.clientSize.clone();
    this.zoomLevel = w.zoomLevel;
    this.offset = w.frame.origin.sub(
      w.frame.origin
        .scale(1 / this.zoomLevel)
        .floor()
        .scale(this.zoomLevel)
    );
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.hidden) return;

    resetScale(ctx);

    ctx.strokeStyle = "#d4d4d4"; // "#292524"; // "#44403c";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();

    // Horizontal lines
    for (let i = 0; i < Math.ceil(this.clientSize.y / this.zoomLevel); i++) {
      const y = this.offset.y + i * this.zoomLevel;
      ctx.moveTo(0, y);
      ctx.lineTo(this.clientSize.x, y);
    }

    // Vertical lines
    for (let i = 0; i < Math.ceil(this.clientSize.x / this.zoomLevel); i++) {
      const x = this.offset.x + i * this.zoomLevel;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.clientSize.y);
    }

    ctx.stroke();
  }
}
