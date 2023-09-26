import { Point, SymbolConnector, SymbolData } from './SymbolData';
import { WorldObjectType } from './WorldObject';

export type EventCategory = 'Selection' | 'Symbol' | 'Connector' | 'CenterOfRotation' | 'Label';

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

export type SelectedObject = Selection<'Connector', SymbolConnector> | Selection<'CenterOfRotation', Point> | Selection<'Label', string>;

export type SelectedObjects = SelectedObject[];

type SelectionEvent = BaseEditorEvent<
	'Selection',
	{
		Changed: SelectedObjects;
	}
>;

// Symbol Editor Event

export type SymbolEditorEvent = SymbolEvent | ConnectorEvent | SelectionEvent | CenterOfRotationEvent;

export type EditorEventHandler = (event: SymbolEditorEvent) => void;
