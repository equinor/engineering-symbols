import { CenterCross } from './world-objects/CenterCross';
import { SymbolGraphic } from './world-objects/SymbolGraphic';
import { PixelGrid } from './world-objects/PixelGrid';
import { WorldObject } from './models/WorldObject';
import { Vec2 } from './models/Vec2';
import { SymbolConnector, SymbolData, SymbolDataInternal } from './models/SymbolData';
import { FrameBorder } from './world-objects/FrameBorder';
import { ConnectorLayer } from './world-objects/ConnectorLayer';
import { EditorEventHandler, SelectedObject, SelectedObjects, SymbolEditorEvent } from './models/EditorEvent';
import { generateRandomString } from './utils/strings';
import { EditorCommandMessage } from './models/EditorCommand';
import { InternalEditorEventHandlers, addWorldEventListeners, createWorldEventHandlers, removeWorldEventListeners } from './event';
import { Info } from './world-objects/Info';
import { CenterOfRotation } from './world-objects/CenterOfRotation';
import { InternalEvents, getResetEvents } from './models/InternalEditorEvents';
import { Cursor } from './world-objects/Cursor';
import { EditorSettings } from './models/EditorSettings';

export class World {
	t = 0;
	tLast = 0;
	dt = 0;
	canvas: HTMLCanvasElement;
	canvasSize = new Vec2(0, 0);
	ctx: CanvasRenderingContext2D;
	worldObjects: WorldObject[] = [];
	clientSize = new Vec2(0, 0);
	symbol?: SymbolDataInternal;
	frame: {
		/** Symbol frame center (screen) */
		center: Vec2;
		/** Symbol frame origin (screen) */
		origin: Vec2;
		screenSize: Vec2;
	};
	zoomLevel = 1;
	zoomStep = 0.5;
	mouse: {
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

	keys: {
		space: {
			isDown: boolean;
		};
		ctrlLeft: {
			isDown: boolean;
		};
	};

	selectedWorldObjects: WorldObject[] = [];

	events: InternalEvents = getResetEvents();

	detailedMode = false;
	readOnly = false;
	panActive = false;
	showGuides = true;
	listeners: EditorEventHandler[] = [];
	eventHandlers: InternalEditorEventHandlers;
	readonly = false;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		//canvas.style.cursor = "move";

		const context = canvas.getContext('2d');
		if (!context) throw new Error('Failed to get CanvasRenderingContext2D');

		this.ctx = context;

		this.updateCanvasSize();

		this.frame = {
			center: this.clientSize.scale(0.5),
			origin: new Vec2(0, 0),
			screenSize: new Vec2(0, 0),
		};

		this.mouse = {
			pos: new Vec2(0, 0),
			posLast: new Vec2(0, 0),
			posFrame: new Vec2(0, 0),
			posFrameNearestPx: new Vec2(0, 0),
			posFrameNearestPx05: new Vec2(0, 0),
			isInCanvas: false,
			isLeftButtonDown: false,
			isMoving: false,
			leftButtonClicked: null,
		};

		this.keys = {
			space: {
				isDown: false,
			},
			ctrlLeft: {
				isDown: false,
			},
		};

		// Order matters...
		this.worldObjects.push(
			new PixelGrid(),
			new SymbolGraphic(),
			new CenterCross(),
			new FrameBorder(),
			new Info(),
			new CenterOfRotation(),
			new ConnectorLayer(),
			//new GeekInfo(),
			new Cursor()
		);

		// Settings

		this.setDefaultSettings();

		this.eventHandlers = createWorldEventHandlers(this);
		addWorldEventListeners(this);
		this.render = this.render.bind(this);
		this.render();
	}

	render(t = 0) {
		this.update(t);
		this.draw();
		requestAnimationFrame(this.render);
	}

	dispose(): void {
		removeWorldEventListeners(this);
		console.info('Symbol Editor was disposed');
	}

	addListener(listener: EditorEventHandler) {
		this.listeners.push(listener);
	}

	removeListener(listener: EditorEventHandler) {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}

	notifyListeners(event: SymbolEditorEvent) {
		this.listeners.forEach((listener) => listener(event));
	}

	notifyConnectorUpdated(id: string) {
		const connector = this.symbol?.connectors.find((c) => c.id === id);

		if (!connector) return;

		this.notifyListeners({
			type: 'Connector',
			reason: 'Updated',
			data: {
				id: connector.id,
				name: connector.name,
				relativePosition: { x: connector.posFrame.x, y: connector.posFrame.y },
				direction: connector.direction,
			},
			symbolState: this.getSymbolState(),
		});
	}

	notifyCenterOfRotationUpdated() {
		if (!this.symbol) return;

		this.notifyListeners({
			type: 'CenterOfRotation',
			reason: 'Updated',
			data: {
				x: this.symbol.centerOfRotation.x,
				y: this.symbol.centerOfRotation.y,
			},
			symbolState: this.getSymbolState(),
		});
	}

	private loadSymbol(symbolDto: SymbolData) {
		this.symbol = {
			id: symbolDto.id,
			key: symbolDto.key,
			size: new Vec2(symbolDto.width, symbolDto.height),
			pathString: symbolDto.path,
			path: new Path2D(symbolDto.path),
			centerOfRotation: new Vec2(symbolDto.centerOfRotation.x, symbolDto.centerOfRotation.y),
			connectors: symbolDto.connectors.map((c) => ({
				id: c.id,
				name: c.name,
				posFrame: new Vec2(c.relativePosition.x, c.relativePosition.y),
				direction: c.direction,
			})),
		};

		this.events.symbol.load = true;

		this.notifyListeners({
			type: 'Symbol',
			reason: 'Loaded',
			data: undefined,
			symbolState: this.getSymbolState(),
		});

		this.zoomToFit();
	}

	private unloadSymbol() {
		this.symbol = undefined;
		this.events.symbol.unload = true;
		this.loadDefaultSettings();

		this.notifyListeners({
			type: 'Symbol',
			reason: 'Unloaded',
			data: undefined,
		});
	}

	private zoomSymbol(data: number) {
		console.log('zoomSymbol ===>>>', data);
		this.setZoomLevel(data);
	}

	private updateSymbol(symbolDto: SymbolData) {
		if (!this.symbol || this.readOnly) return;

		//this.symbol.id = symbolDto.id;
		this.symbol.key = symbolDto.key;
		//this.symbol.size = new Vec2(symbolDto.width, symbolDto.height);
		//this.symbol.pathString = symbolDto.path;
		//this.symbol.path = new Path2D(symbolDto.path);
		this.symbol.centerOfRotation = new Vec2(symbolDto.centerOfRotation.x, symbolDto.centerOfRotation.y);
		this.symbol.connectors = symbolDto.connectors.map((c) => ({
			...c,
			posFrame: new Vec2(c.relativePosition.x, c.relativePosition.y),
		}));

		this.events.connector.updated = symbolDto.connectors.map((c) => c.id);

		this.notifyListeners({
			type: 'Symbol',
			reason: 'Updated',
			data: symbolDto,
			symbolState: symbolDto,
		});
	}

	private getSymbolState(): SymbolData | undefined {
		return !this.symbol
			? undefined
			: {
					id: this.symbol.id,
					key: this.symbol.key,
					path: this.symbol.pathString,
					width: this.symbol.size.x,
					height: this.symbol.size.y,
					centerOfRotation: this.symbol.centerOfRotation,
					connectors: this.symbol.connectors.map((c) => ({
						id: c.id,
						name: c.name,
						relativePosition: { x: c.posFrame.x, y: c.posFrame.y },
						direction: c.direction,
					})),
			  };
	}

	zoomToFit() {
		if (!this.symbol) return;
		const z = this.clientSize.scale(0.6).div(this.symbol.size);
		this.zoomLevel = Math.round(z.min() * 2) / 2;
	}

	private addNewConnector() {
		if (!this.symbol || this.readOnly) return;

		const offset = 5;
		let spawnPos = new Vec2(0, -offset);

		let occupied = true;

		while (occupied) {
			if (this.symbol.connectors.find((c) => c.posFrame.equals(spawnPos))) {
				spawnPos = spawnPos.add(new Vec2(offset, 0));
			} else {
				occupied = false;
			}
		}

		const uid = generateRandomString(10, this.symbol.connectors);

		const newConnector = {
			id: uid,
			name: uid,
			posFrame: spawnPos,
			direction: 0,
		};

		this.symbol.connectors.push(newConnector);

		this.notifyListeners({
			type: 'Connector',
			reason: 'Added',
			data: {
				id: newConnector.id,
				name: newConnector.name,
				relativePosition: {
					x: newConnector.posFrame.x,
					y: newConnector.posFrame.y,
				},
				direction: newConnector.direction,
			},
			symbolState: this.getSymbolState(),
		});
	}

	private addConnector(connector: SymbolConnector) {
		if (!this.symbol || this.readOnly) return;
		this.symbol.connectors.push({ ...connector, posFrame: new Vec2(connector.relativePosition.x, connector.relativePosition.y) });
		this.notifyListeners({
			type: 'Connector',
			reason: 'Added',
			data: connector,
			symbolState: this.getSymbolState(),
		});
	}

	private removeConnector(connectorId: string) {
		if (!this.symbol || this.readOnly) return;
		const index = this.symbol.connectors.findIndex((c) => c.id === connectorId);
		if (index > -1) {
			this.symbol.connectors.splice(index, 1);

			this.selectedWorldObjects = [];

			this.notifyListeners({
				type: 'Connector',
				reason: 'Removed',
				data: connectorId,
				symbolState: this.getSymbolState(),
			});
		}
	}

	private updateConnector(connector: SymbolConnector) {
		if (!this.symbol || this.readOnly) return;
		const c = this.symbol.connectors.find((c) => c.id === connector.id);
		if (!c) return;
		c.posFrame.x = connector.relativePosition.x;
		c.posFrame.y = connector.relativePosition.y;
		c.direction = connector.direction;
		this.events.connector.updated.push(c.id);
		this.notifyConnectorUpdated(c.id);
	}

	private setDefaultSettings() {
		this.updateSettings({
			readOnly: false,
			showGrid: true,
		});
	}

	private updateSettings(settings: EditorSettings) {
		this.readOnly = settings.readOnly;
		this.showGuides = settings.showGrid;
	}

	private loadDefaultSettings() {
		this.zoomLevel = 1;
		this.frame.center = this.clientSize.scale(0.5);
		this.frame.origin = new Vec2(0, 0);
		this.frame.screenSize = new Vec2(0, 0);
		this.selectedWorldObjects = [];
	}

	updateCanvasSize() {
		//const r = this.canvas.getBoundingClientRect();
		const width = this.canvas.parentElement?.clientWidth;
		const height = this.canvas.parentElement?.clientHeight;
		if (!width || !height) {
			console.error('Failed to get canvas container width and height');
			return;
		}
		const ratio = window.devicePixelRatio;
		this.canvas.width = width * ratio;
		this.canvas.height = height * ratio;
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
		this.canvasSize = new Vec2(this.canvas.width, this.canvas.height);
		this.clientSize = new Vec2(width, height);
	}

	handleKeyUpOrDown(e: KeyboardEvent) {
		const down = e.type === 'keydown';

		let key: { isDown: boolean };

		switch (e.code) {
			case 'Space':
				key = this.keys.space;
				break;
			case 'ControlLeft':
				key = this.keys.ctrlLeft;
				break;
			case 'MetaLeft':
				key = this.keys.ctrlLeft;
				break;
			default:
				return;
		}

		if (key.isDown !== down) {
			key.isDown = down;
		}
	}

	setZoomLevel(deltaY: number) {
		const newZoomLevel = this.zoomLevel + Math.sign(deltaY) * this.zoomStep;
		this.zoomLevel = Math.max(0.5, Math.min(40.0, newZoomLevel));
	}

	setMousePos(clientX: number, clientY: number) {
		const rect = this.canvas.getBoundingClientRect();
		this.mouse.pos.x = clientX - rect.left;
		this.mouse.pos.y = clientY - rect.top;
	}

	handleLeftMouseButtonClick(clientX: number, clientY: number) {
		const r = this.canvas.getBoundingClientRect();
		this.mouse.leftButtonClicked = new Vec2(clientX - r.x, clientY - r.y);
	}

	private calculateUserInput() {
		this.detailedMode = this.zoomLevel >= 12;
		this.mouse.isMoving = !this.mouse.pos.equals(this.mouse.posLast);

		this.panActive = this.keys.space.isDown && this.mouse.isLeftButtonDown && this.mouse.isMoving;

		// Update the frame position on pan
		if (this.panActive) {
			this.frame.center = this.frame.center.add(this.mouse.pos.sub(this.mouse.posLast));
		}

		// Update symbol and connectors
		if (this.symbol) {
			this.frame.screenSize = this.symbol.size.scale(this.zoomLevel);
			this.frame.origin = this.frame.center.sub(this.frame.screenSize.scale(0.5));

			this.mouse.posFrame = this.mouse.pos.sub(this.frame.origin).scale(1 / this.zoomLevel);

			this.mouse.posFrameNearestPx = this.mouse.posFrame.round();
			this.mouse.posFrameNearestPx05 = this.mouse.posFrame.round(2);
		}
	}

	dispatchCommands(commands: EditorCommandMessage[]) {
		commands.forEach((c) => this.dispatchCommand(c));
	}

	dispatchCommand(command: EditorCommandMessage) {
		switch (command.type) {
			case 'Symbol':
				switch (command.action) {
					case 'Load':
						this.loadSymbol(command.data);
						break;
					case 'Update':
						this.updateSymbol(command.data);
						break;
					case 'Unload':
						this.unloadSymbol();
						break;
					case 'ZoomLevel':
						this.zoomSymbol(command.data);
						break;
				}
				break;
			case 'Connector':
				switch (command.action) {
					case 'New':
						this.addNewConnector();
						break;
					case 'Add':
						this.addConnector(command.data);
						break;
					case 'Remove':
						this.removeConnector(command.data);
						break;
					case 'Update':
						this.updateConnector(command.data);
						break;
					// case "select":
					// w.selectConnector(command.data);
					// break;
				}
				break;
			case 'Settings':
				switch (command.action) {
					case 'Update':
						this.updateSettings(command.data);
						break;
					case 'Reset':
						this.setDefaultSettings();
						break;
					default:
						break;
				}
		}
	}

	update(tp = 0) {
		this.t = tp;
		this.dt = this.t - this.tLast;
		this.tLast = this.t;

		this.calculateUserInput();

		for (let i = 0; i < this.worldObjects.length; i++) {
			this.worldObjects[i].update(this);
		}

		// Check if connectors selection changed
		if (this.events.worldObjects.selectionChanged) {
			const selected: SelectedObjects = this.selectedWorldObjects.map(
				(o) =>
					({
						type: o.type,
						data: o.toExternalModel(this),
					} as SelectedObject)
			);

			this.notifyListeners({
				type: 'Selection',
				reason: 'Changed',
				data: selected,
				symbolState: this.getSymbolState(),
			});
		}

		// Tail
		this.mouse.leftButtonClicked = null;
		this.mouse.posLast = this.mouse.pos.clone();
		// Reset events
		this.events = getResetEvents();
	}

	draw() {
		// Reset current transformation matrix to the identity matrix
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

		for (let i = 0; i < this.worldObjects.length; i++) {
			if (this.worldObjects[i].hidden) continue;
			this.worldObjects[i].draw(this.ctx);
		}
	}
}
