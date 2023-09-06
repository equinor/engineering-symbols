import { Store } from 'pullstate';

interface ISymbolUploadStore {
	validateSvgQuery: any;
}

interface ISymbolStore {
	symbolsQuery: any;
}

interface IManageSymbolStore {
	manageSymbolsQuery: any;
	manageDeleteSymbolsQuery: any;
	manageUpdateSymbolsQuery: any;
	manageUpdateStatusSymbolsQuery: any;
}

export const SymbolUploadStore = new Store<ISymbolUploadStore>({
	validateSvgQuery: {},
});

export const SymbolsStore = new Store<ISymbolStore>({
	symbolsQuery: [],
});

export const ManageSymbolsStore = new Store<IManageSymbolStore>({
	manageSymbolsQuery: {},
	manageDeleteSymbolsQuery: {},
	manageUpdateSymbolsQuery: {},
	manageUpdateStatusSymbolsQuery: {},
});

export type { ISymbolStore, ISymbolUploadStore, IManageSymbolStore };
