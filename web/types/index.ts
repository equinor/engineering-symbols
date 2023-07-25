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

export type SymbolsPageProps = {
	theme: ColorThemeProps;
};

export type EditPageProps = {
	theme: ColorThemeProps;
};

export type HomePageProps = {
	theme: ColorThemeProps;
};

export interface SymbolsProps extends SymbolsDefaultProps {
	key: string;
}

export type SymbolsDefaultProps = {
	id: string;
	dateTimeCreated?: string;
	dateTimeUpdated?: string;
	geometry: string;
	width: number;
	height: number;
	connectors: ConnectorsProps[];
};

export interface IconProps extends SymbolsProps {
	category?: string;
}

export type IconByCategoryProps = {
	category: string;
	icons: SymbolsProps[];
};
