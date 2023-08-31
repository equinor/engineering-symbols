import { Store } from 'pullstate';

interface ISymbolUploadStore {
	validateSvgQuery: any;
}

interface ISymbolStore {
	symbolsQuery: any;
}

export const SymbolUploadStore = new Store<ISymbolUploadStore>({
	validateSvgQuery: {},
});

export const SymbolStore = new Store<ISymbolStore>({
	symbolsQuery: {},
});

export type { ISymbolStore, ISymbolUploadStore };
