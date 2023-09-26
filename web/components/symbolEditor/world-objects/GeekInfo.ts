import { World } from "../World";
import { Vec2 } from "../models/Vec2";
import { WorldObject, WorldObjectRect } from "../models/WorldObject";

export class GeekInfo extends WorldObject {
  lines: string[] = [];

  constructor() {
    super("GeekInfo");
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
    this.lines = [
      `zoom: ${w.zoomLevel * 100} %`,
      `frame.origin: ${w.frame.origin.x}, ${w.frame.origin.y}`,
      `frame.center: ${w.frame.center.x}, ${w.frame.center.y}`,
      `mouse: ${w.mouse.pos.x}, ${w.mouse.pos.y}`,
      `mouse.posFrame: ${w.mouse.posFrame.x.toFixed(
        2
      )}, ${w.mouse.posFrame.y.toFixed(2)}`,
      `mouse.posFrameNearestPx: ${w.mouse.posFrameNearestPx.x}, ${w.mouse.posFrameNearestPx.y}`,
      `mouse.posFrameNearestPx05: ${w.mouse.posFrameNearestPx05.x}, ${w.mouse.posFrameNearestPx05.y}`,
      `selectedConn: ${w.selectedWorldObjects.map((c) => c.key).join(", ")}`,
    ];
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.hidden) return;

    ctx.fillStyle = "#16a34a";
    ctx.font = "20px Roboto";

    for (let i = 0; i < this.lines.length; i++) {
      ctx.fillText(this.lines[i], 20, 35 + i * 30);
    }
  }
}
