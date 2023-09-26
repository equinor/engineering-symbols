import { World } from "../World";
import { WorldObject, WorldObjectRect } from "../models/WorldObject";
import { Vec2 } from "../models/Vec2";

export class CenterCross extends WorldObject {
  frameCenter = new Vec2(0, 0);
  canvasSize = new Vec2(0, 0);

  constructor() {
    super("CenterCross");
  }

  onUpdate(w: Readonly<World>): void {
    this.frameCenter = w.frame.center.clone();
    this.canvasSize = w.canvasSize.clone();

    this.hidden = !w.showGuides;
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.hidden) return;

    const cx = this.frameCenter.x;
    const cy = this.frameCenter.y;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, 0);

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, this.canvasSize.y);

    ctx.moveTo(cx, cy);
    ctx.lineTo(0, cy);

    ctx.moveTo(cx, cy);
    ctx.lineTo(this.canvasSize.x, cy);

    ctx.strokeStyle = "#0369a1"; // "#16a34a";
    ctx.lineWidth = 1;
    ctx.setLineDash([20, 8, 3, 8]);
    ctx.stroke();
  }

  isInsideHitBox(): boolean {
    return false;
  }

  toExternalModel(): object {
    throw new Error("Method not implemented.");
  }

  getBoundingBoxRect(): WorldObjectRect {
    throw new Error("Method not implemented.");
  }
}
