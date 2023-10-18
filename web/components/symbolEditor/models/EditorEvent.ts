import { Point, SymbolConnector, SymbolData } from './SymbolData';
import { Vec2 } from './Vec2';
import { WorldObjectType } from './WorldObject';

export type EventCategory = 'Selection' | 'Symbol' | 'Connector' | 'CenterOfRotation' | 'Label' | 'Hover';

type BaseEditorEvent<T extends EventCategory, A extends object> = {
	[K in keyof A]: {
		symbolState?: Readonly<SymbolData>;
		type: T;
		reason: K;
		data: A[K];
	};
}[keyof A];

type SymbolEvent = BaseEditorEvent<
	'Symbol',
	{
		Loaded: undefined;
		Updated: SymbolData;
		Unloaded: undefined;
	}
>;

type ConnectorEvent = BaseEditorEvent<
	'Connector',
	{
		Added: SymbolConnector;
		Removed: string;
		Updated: SymbolConnector;
	}
>;

type CenterOfRotationEvent = BaseEditorEvent<
	'CenterOfRotation',
	{
		Updated: Point;
	}
>;

// Selection Event

type SelectableObject = Extract<WorldObjectType, 'Connector' | 'CenterOfRotation' | 'Label'>;

export type Selection<T extends SelectableObject, TData> = {
	type: T;
	data: TData;
};

type HoverConnectorInformation = {
	position?: Vec2;
	selected: SymbolConnector[];
};

type ChangedConnectorInformation = {
	position?: Vec2;
	selected: SelectedObjects[];
};

export type SelectedObject = Selection<'Connector', SymbolConnector> | Selection<'CenterOfRotation', Point> | Selection<'Label', string>;
export type HoverObject = Selection<'Connector', HoverConnectorInformation> | Selection<'CenterOfRotation', Point> | Selection<'Label', string>;

export type SelectedObjects = SelectedObject[];
export type HoverObjects = HoverObject[];

type SelectionEvent = BaseEditorEvent<
	'Selection',
	{
		Changed: ChangedConnectorInformation;
	}
>;

type HoverEvent = BaseEditorEvent<
	'Hover',
	{
		Changed: HoverObjects;
	}
>;

// Symbol Editor Event

export type SymbolEditorEvent = SymbolEvent | ConnectorEvent | SelectionEvent | CenterOfRotationEvent | HoverEvent;

export type EditorEventHandler = (event: SymbolEditorEvent) => void;
