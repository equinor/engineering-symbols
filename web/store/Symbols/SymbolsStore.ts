import { Store } from 'pullstate';
import { SymbolsProps } from '../../types';

interface ISymbolUploadStore {
	validateSvgQuery: any;
	validateSvgErrorMessage: string | null;
	isSymbolUploadReposnseSucceeded: boolean;
}

interface ISymbolStore {
	symbolsQuery: any;
}

interface IManageSymbolStore {
	manageSymbolsQuery: SymbolsProps[];
	manageDeleteSymbolsQuery: any;
	manageSymbolErrorMessage: string | null;
	isDeleteSymbolReposnseSucceeded: boolean;
	isUpdateSymbolReposnseSucceeded: boolean;
	manageUpdateSymbolsQuery: any;
	manageUpdateStatusSymbolsQuery: any;
}

export const SymbolUploadStore = new Store<ISymbolUploadStore>({
	validateSvgQuery: {},
	validateSvgErrorMessage: null,
	isSymbolUploadReposnseSucceeded: false,
});

export const SymbolsStore = new Store<ISymbolStore>({
	symbolsQuery: [],
});

export const ManageSymbolsStore = new Store<IManageSymbolStore>({
	manageSymbolsQuery: [],
	manageDeleteSymbolsQuery: {},
	manageUpdateSymbolsQuery: {},
	manageSymbolErrorMessage: null,
	isDeleteSymbolReposnseSucceeded: false,
	isUpdateSymbolReposnseSucceeded: false,
	manageUpdateStatusSymbolsQuery: {},
});

export type { ISymbolStore, ISymbolUploadStore, IManageSymbolStore };
