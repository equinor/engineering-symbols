export type RelativePositionProps = {
	x: number;
	y: number;
};

export type ConnectorsProps = {
	id: string;
	name?: string;
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

export type RunEditorCommandProps = {
	symbol: SymbolsProps | undefined;
	type: 'Symbol' | 'Connector' | 'Settings';
	action: 'Update' | 'Load' | 'New';
};

export type StatusProps = 'Draft' | 'Review' | 'Issued' | 'Rejected' | number;

export type FilterStatusProps = 'draft' | 'review' | 'draft' | 'reject' | 'all' | 'issued';

export interface SymbolsProps extends SymbolsDefaultProps {
	key: string;
	iri: string;
	status: StatusProps;
	version: number;
	creators?: string;
	description?: string;
	isRevisionOf?: string;
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
