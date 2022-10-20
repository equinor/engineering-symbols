export interface SymbolConnector {
	relativePosition: { x: number; y: number };
	direction: number;
	id: string;
}

export type SvgComponentProps = {
	renderConnectors?: boolean;
	viewBoxHeight: number;
	viewBoxWidth: number;
	connectors?: SymbolConnector[];
	height: number;
	width: number;
	fill: string;
	path: string;
};
