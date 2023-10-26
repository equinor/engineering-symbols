import { ConnectorsProps } from '../../../types';
import { Vec2 } from './Vec2';

// External models

export type Point = { x: number; y: number };

export type SymbolData = {
	id: string;
	identifier: string;
	path: string;
	width: number;
	height: number;
	centerOfRotation: Point;
	connectionPoints: ConnectorsProps[];
};

// Internal models

export type SymbolDataInternal = {
	id: string;
	identifier: string;
	size: Vec2;
	pathString: string;
	path: Path2D;
	centerOfRotation: Vec2;
	connectionPoints: SymbolConnectorInternal[];
};

export type SymbolConnectorInternal = {
	identifier: any;
	id: string;
	name: string;
	posFrame: Vec2;
	direction: number;
};
