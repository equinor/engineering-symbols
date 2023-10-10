import { EditorSettings } from './EditorSettings';
import { SymbolConnector, SymbolData } from './SymbolData';

export type CommandType = 'Symbol' | 'Connector' | 'Visibility' | 'Settings';

type BaseEditorCommandMessage<T extends CommandType, A> = {
	[K in keyof A]: {
		type: T;
		action: K;
		data: A[K];
	};
}[keyof A];

type SymbolCommand = BaseEditorCommandMessage<
	'Symbol',
	{
		Load: SymbolData;
		Update: SymbolData;
		Unload: undefined;
	}
>;

type ConnectorCommand = BaseEditorCommandMessage<
	'Connector',
	{
		New: undefined;
		Add: SymbolConnector;
		Remove: string;
		Update: SymbolConnector;
		Select: boolean;
	}
>;

type SettingsCommand = BaseEditorCommandMessage<
	'Settings',
	{
		Update: EditorSettings;
		Reset: boolean;
		/** Adjust zoom level by one step. 1 = Zoom In, -1 = Zoom Out */
		ZoomInOrOut: number;
	}
>;

export type EditorCommandMessage = SymbolCommand | ConnectorCommand | SettingsCommand;
