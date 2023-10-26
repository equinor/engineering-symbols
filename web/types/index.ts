export type RelativePositionProps = {
	x: number;
	y: number;
};

export type ConnectorsProps = {
	identifier: string;
	position: {
		x: number;
		y: number;
	};
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

export type StatusProps = 'Draft' | 'ReadyForReview' | 'Review' | 'Published' | 'Rejected' | number;

export type FilterStatusProps = 'draft' | 'ready' | 'draft' | 'reject' | 'all';

// export interface SymbolsProps extends SymbolsDefaultProps {
// 	key: string;
// 	owner?: string;
// 	status?: StatusProps;
// 	description?: string;
// }

// export type SymbolsDefaultProps = {
// 	id: string;
// 	dateTimeCreated?: string;
// 	dateTimeUpdated?: string;
// 	geometry: string;
// 	width: number;
// 	height: number;
// 	connectors: ConnectorsProps[];
// };

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

// NEW
export type EngineeringSymbolDto = {
	id: string;
	iri: string;
	status?: string;
	version: string;
	previousVersion: string | null;
	previousVersionIri: string | null;
	dateTimeCreated: string;
	dateTimeModified: string;
	dateTimeIssued: string;
} & Omit<SymbolsProps, 'isRevisionOf'>;

/** Model for CREATING and UPDATING a symbol */
export type SymbolsProps = {
	id: string;
	identifier: string;
	isRevisionOf?: string;
	label: string;
	description: string;
	status: StatusProps;
	sources: string[] | null;
	subjects: string[] | null;
	userIdentifier?: string;
	creators: {
		name: string;
		email: string;
	}[];
	contributors: {
		name: string;
		email: string;
	}[];
	shape: EngineeringSymbolShape;
	width: number;
	height: number;
	drawColor?: string;
	fillColor?: string;
	centerOfRotation: {
		x: number;
		y: number;
	};
	connectionPoints: ConnectorsProps[];
};

export type EngineeringSymbolShape = {
	serializations: EngineeringSymbolShapeSerializations[];
	depictions?: string[];
};

export type EngineeringSymbolShapeSerializations = {
	type: string;
	value: string;
};
