import { World } from '../World';
import { Vec2 } from '../models/Vec2';
import { WorldObject, WorldObjectRect } from '../models/WorldObject';
import { Connector } from './Connector';
import { ConnectorLabel } from './ConnectorLabel';

type ConnectorParts = {
	body: Connector;
	label: ConnectorLabel;
};

export class ConnectorLayer extends WorldObject {
	connectors: ConnectorParts[] = [];
	constructor() {
		super('ConnectorLayer');
	}

	onUpdate(w: Readonly<World>): void {
		if (!w.symbol) {
			if (this.connectors.length > 0) this.connectors = [];
			return;
		}

		const currentConnectors = this.connectors.map((c) => c.body.id);

		// Add or update connectors
		for (let j = 0; j < w.symbol.connectors.length; j++) {
			const sc = w.symbol.connectors[j];
			const existing = this.connectors.find((c) => c.body.id === sc.id);
			if (!existing) {
				const newConnector = new Connector(sc);
				this.connectors.push({
					body: newConnector,
					label: new ConnectorLabel(newConnector),
				});
			} else {
				if (w.events.connector.updated.length > 0 && w.events.connector.updated.includes(sc.id)) {
					//existing.body.id = sc.id; // Add and remove if id changes?
					existing.body.direction = sc.direction;
					existing.body.posFrame = sc.posFrame;
				}
			}

			currentConnectors.splice(currentConnectors.indexOf(sc.id), 1);
		}

		// Remove connectors
		for (const id of currentConnectors) {
			const index = this.connectors.findIndex((c) => c.body.id === id);
			this.connectors.splice(index, 1);
		}

		for (const connector of this.connectors) {
			connector.body.update(w);
			connector.label.update(w);
		}

		// Bring selected connector to front if one or more are on top of each other
		// TODO: Do not work at the moment
		// if (w.selectedConnectors.length === 1) {
		//   const selectedConnector = w.selectedConnectors[0];
		//   const index = this.connectors.indexOf(selectedConnector);
		//   if (index > 0) {
		//     this.connectors.splice(index, 1);
		//     this.connectors.unshift(selectedConnector);
		//     //console.log(this.connectors.map((c) => c.id));
		//   }
		// }
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

	onDraw(ctx: CanvasRenderingContext2D): void {
		if (this.hidden) return;

		for (const connector of this.connectors) {
			connector.body.draw(ctx);
		}

		// Draw labels on top of connectors
		for (const connector of this.connectors) {
			connector.label.draw(ctx);
		}
	}
}
