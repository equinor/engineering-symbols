import { StatusProps } from '../../../types';
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
	path?: string;
	width: number;
	label?: string;
	geometry?: string;
	height: number;
	status?: StatusProps;
	centerOfRotation: Point;
	version?: number;
	creators?: string;
	description?: string;
	isRevisionOf?: string;
	connectors: SymbolConnector[];
};

// Internal models

export type SymbolDataInternal = {
	id: string;
	key: string;
	size: Vec2;
	pathString: string | undefined;
	path: Path2D;
	centerOfRotation: Vec2;
	label?: string;
	geometry?: string;
	description: string | undefined;
	status: StatusProps | undefined;
	connectors: SymbolConnectorInternal[];
};

export type SymbolConnectorInternal = {
	id: string;
	name: string;
	posFrame: Vec2;
	direction: number;
};
