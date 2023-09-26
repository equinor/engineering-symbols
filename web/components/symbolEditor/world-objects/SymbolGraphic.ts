import { World } from "../World";
import { WorldObject, WorldObjectRect } from "../models/WorldObject";
import { Vec2 } from "../models/Vec2";
import { resetScale } from "../utils/context2d";

export class SymbolGraphic extends WorldObject {
  protected symbolPath?: Path2D;
  hidden = false;
  frameOrigin = new Vec2(0, 0);
  zoomLevel = 1;

  constructor() {
    super("SymbolGraphic");
  }

  onUpdate(w: Readonly<World>): void {
    this.frameOrigin = w.frame.origin.clone();
    this.zoomLevel = w.zoomLevel;
    if (!w.symbol) {
      if (this.symbolPath) this.symbolPath = undefined;
      return;
    }

    if (!this.symbolPath) this.symbolPath = new Path2D(w.symbol.path);
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.hidden || !this.symbolPath) return;

    ctx.translate(this.frameOrigin.x, this.frameOrigin.y);
    ctx.scale(this.zoomLevel, this.zoomLevel);
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#78716c";
    ctx.fill(this.symbolPath);
    ctx.globalAlpha = 1;
    resetScale(ctx);
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
}
