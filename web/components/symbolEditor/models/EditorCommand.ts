import { SymbolConnector, SymbolData } from './SymbolData';

export type CommandType = 'Symbol' | 'Connector' | 'Visibility';

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
		Unload: undefined;
	}
>;

type ConnectorCommand = BaseEditorCommandMessage<
	'Connector',
	{
		Add: SymbolConnector;
		Remove: string;
		Update: SymbolConnector;
		Select: boolean;
	}
>;

type VisibilityCommand = BaseEditorCommandMessage<
	'Visibility',
	{
		ShowGrid: boolean;
	}
>;

export type EditorCommandMessage = SymbolCommand | ConnectorCommand | VisibilityCommand;
