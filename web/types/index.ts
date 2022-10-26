export type RelativePositionProps = {
	x: number;
	y: number;
};

export type ConnectorsProps = {
	id: string;
	relativePosition: RelativePositionProps;
	direction: number;
};

export type ColorThemeProps = {
	body: string;
	text: string;
	fill: string;
	toggleBorder: string;
	boxShadow: string;
	background: string;
	hover: {
		body: string;
		text: string;
		fill: string;
		toggleBorder: string;
		background: string;
	};
};

export type IconPageProps = {
	theme: ColorThemeProps;
};

export type IconDefaultProps = {
	name: string;
	id: string;
	svgString: string;
	geometryString: string;
	width: number;
	height: number;
	connectors: ConnectorsProps[];
};

export interface IconProps extends IconDefaultProps {
	category?: string;
}

export type IconByCategoryProps = {
	category: string;
	icons: IconDefaultProps[];
};
