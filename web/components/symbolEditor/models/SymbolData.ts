import { Vec2 } from "./Vec2";

// External models

export type Point = { x: number; y: number };

export type SymbolConnector = {
  id: string;
  relativePosition: Point;
  direction: number;
};

export type SymbolData = {
  name: string;
  path: string;
  width: number;
  height: number;
  connectors: SymbolConnector[];
  centerOfRotation: Point;
};

// Internal models

export type SymbolDataInternal = {
  id: string;
  size: Vec2;
  path: Path2D;
  centerOfRotation: Vec2;
  connectors: SymbolConnectorInternal[];
};

export type SymbolConnectorInternal = {
  id: string;
  posFrame: Vec2;
  direction: number;
};
