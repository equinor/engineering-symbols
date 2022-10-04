export type RelativePositionProps = {
	x: number;
	y: number;
};

export type ConnectorsProps = {
	id: string;
	relativePosition: RelativePositionProps;
	direction: number;
};

export type IconProps = {
	name: string;
	category?: string;
	description?: string;
	id: string;
	svgString: string;
	geometryString: string;
	width: number;
	height: number;
	connectors: ConnectorsProps[];
};
