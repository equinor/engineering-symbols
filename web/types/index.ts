export type RelativePositionProps = {
	x: number;
	y: number;
};

export type ConnectorsProps = {
	id: string;
	name: string;
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

export type StatusProps = 'Draft' | 'ReadyForReview' | 'Review' | 'Published' | 'Rejected' | number;

export interface SymbolsProps extends SymbolsDefaultProps {
	key: string;
	owner?: string;
	status?: StatusProps;
	description?: string;
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

export type UploadSymbolProps = {
	id: string;
	dateTimeCreated?: string;
	dateTimeUpdated?: string;
	paths: string | string[];
	width: number;
	height: number;
	connectors: ConnectorsProps[];
	key: string;
	state?: StatusProps;
	description?: string;
};

export interface IconProps extends SymbolsProps {
	category?: string;
}

export type IconByCategoryProps = {
	category: string;
	icons: SymbolsProps[];
};
