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
		ZoomLevel: number;
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
	}
>;

export type EditorCommandMessage = SymbolCommand | ConnectorCommand | SettingsCommand;
