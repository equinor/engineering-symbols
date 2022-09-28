export interface ConnectorSymbol {
	id: string;
	svgString: string;
	geometryString: string;
	width: number;
	height: number;
	connectors: SymbolConnector[];
}

export interface SymbolConnector {
	id: string;
	relativePosition: { x: number; y: number };
	direction: number;
}
