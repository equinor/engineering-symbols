import { ConnectorsProps } from '../../types';

export type SvgComponentProps = {
	renderConnectors?: boolean;
	viewBoxHeight: number;
	viewBoxWidth: number;
	connectors?: ConnectorsProps[];
	height: number;
	rotate?: number;
	width: number;
	fill: string;
	path: string | string[];
};
