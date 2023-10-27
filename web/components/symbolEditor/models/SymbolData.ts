import { Vec2 } from './Vec2';

// External models

export type Point = { x: number; y: number };

export type SymbolConnector = {
	id: string;
	name?: string;
	relativePosition: Point;
	direction: number;
};

export type SymbolData = {
	id: string;
	key: string;
	path: string;
	width: number;
	height: number;
	centerOfRotation: Point;
	connectors: SymbolConnector[];
};

// Internal models

export type SymbolDataInternal = {
	id: string;
	key: string;
	size: Vec2;
	pathString: string;
	path: Path2D;
	centerOfRotation: Vec2;
	connectors: SymbolConnectorInternal[];
};

export type SymbolConnectorInternal = {
	id: string;
	name: string;
	posFrame: Vec2;
	direction: number;
};
