import { World } from "../World";
import { WorldObject, WorldObjectRect } from "../models/WorldObject";
import { Vec2 } from "../models/Vec2";
import { SymbolConnector, SymbolConnectorInternal } from "../models/SymbolData";
import { resetScale } from "../utils/context2d";

// Straight 24x24
const arrowUp =
  "M13,6.83l0.88,0.88c0.39,0.39,1.02,0.39,1.41,0c0.39-0.39,0.39-1.02,0-1.41l-2.59-2.59c-0.39-0.39-1.02-0.39-1.41,0 L8.71,6.29c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,6.83V20c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V6.83 L13,6.83z";

const arrowPath = new Path2D(arrowUp);
const arrowSize = [24, 24];
const arrowScale = 2.4;
const arrowDx = -(arrowSize[0] / 2) * arrowScale;
const arrowDy = -arrowSize[1] * arrowScale;

export class Connector extends WorldObject {
  id: string;
  r = 6;
  direction = 0;
  zoomLevel = 1;

  constructor(connector: SymbolConnectorInternal) {
    super(connector.id);
    this.type = "Connector";
    this.id = connector.id;
    this.posFrame = connector.posFrame;
    this.direction = connector.direction;
    this.isSelectable = true;
    this.isDraggable = true;
  }

  isInsideHitBox(pos: Vec2): boolean {
    return pos.distance(this.posClient) <= this.r + 2;
  }

  getBoundingBoxRect(): WorldObjectRect {
    const size = this.r * 2 + 10;
    return {
      origin: this.posClient.sub(new Vec2(size / 2, size / 2)),
      width: size,
      height: size,
    };
  }

  toExternalModel(): SymbolConnector {
    return {
      id: this.id,
      relativePosition: {
        x: this.posFrame.x,
        y: this.posFrame.y,
      },
      direction: this.direction,
    };
  }

  onUpdate(w: Readonly<World>): void {
    this.zoomLevel = w.zoomLevel;
    // Update connector pos when connector move ends
    if (this.wasDragged) {
      //console.log("wasDragged");
      const connector = w.symbol?.connectors.find((c) => c.id === this.id);
      if (connector) connector.posFrame = this.posFrame.clone();
      w.notifyConnectorUpdated(this.id);
    }
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.hidden) return;

    const color = "#292524"; // this.isSelected ? "red" : "black";

    ctx.beginPath();
    ctx.arc(this.posClient.x, this.posClient.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    resetScale(ctx);

    // Direction arrow
    ctx.translate(this.posClient.x, this.posClient.y);
    ctx.rotate((this.direction * Math.PI) / 180);
    ctx.translate(arrowDx, arrowDy - 1.5 * this.r);
    ctx.scale(arrowScale, arrowScale);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = color;
    ctx.fill(arrowPath);
    resetScale(ctx);
  }
}
