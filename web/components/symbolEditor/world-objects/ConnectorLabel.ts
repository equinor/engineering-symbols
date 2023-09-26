import { World } from '../World';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';
import { Vec2 } from '../models/Vec2';
import { SymbolConnector, SymbolConnectorInternal } from '../models/SymbolData';
import { Connector } from './Connector';
import { resetScale } from '../utils/context2d';

export class ConnectorLabel extends WorldObject {
	readonly key: string;
	readonly type = 'Label';
	hidden = false;
	label = '<No label>';
	posClient = new Vec2(0, 0);
	labelOffset = 12;
	connector: Connector;

	constructor(connector: Connector) {
		super(connector.id + '_label');
		this.key = 'ConnectorLabel-' + connector.id;
		this.connector = connector;
	}

	onUpdate(w: Readonly<World>): void {
		this.hidden = !(this.connector.isMouseOver || this.connector.isSelected);
	}

	onDraw(ctx: CanvasRenderingContext2D): void {
		if (this.hidden) return;

		const text = this.connector.id;

		const coordText = `x: ${this.connector.posFrame.x.toFixed(1)}  y: ${this.connector.posFrame.y.toFixed(1)}`;

		ctx.font = '20px Roboto';

		// Measure text width
		const textMetrics = ctx.measureText(text);
		const textMetricsCoord = ctx.measureText(coordText);
		const textWidth = Math.max(textMetrics.width, textMetricsCoord.width, 130);

		const textHeight = 18;
		const padding = 10;

		const cx = this.connector.posClient.x + 14;
		const cy = this.connector.posClient.y + 14;

		// Draw rectangle
		const rectWidth = textWidth + 2 * padding;
		const rectHeight = 80;
		ctx.fillStyle = '#d6d3d1';
		ctx.fillRect(cx, cy, rectWidth, rectHeight);

		// Draw border
		ctx.strokeStyle = '#44403c';
		ctx.lineWidth = 1;
		ctx.setLineDash([]);
		ctx.strokeRect(cx, cy, rectWidth, rectHeight);

		// Draw text
		ctx.fillStyle = '#000';
		ctx.fillText(text, cx + padding, cy + padding + textHeight);

		ctx.font = '15px Roboto';

		// x coord
		ctx.fillText(coordText, cx + padding, cy + padding + textHeight / 0.9 + 20);

		ctx.fillText(`${this.connector.direction}°`, cx + padding, cy + padding + textHeight / 0.9 + 40);
	}

	getBoundingBoxRect(): WorldObjectRect {
		throw new Error('Method not implemented.');
	}

	isInsideHitBox(pos: Vec2): boolean {
		return false;
	}

	toExternalModel(): object {
		throw new Error('Method not implemented.');
	}
}
