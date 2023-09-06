import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { uploadSvgFile, getSymbolsQuery, getManageSymbolsQuery, deleteSymbol, updateSymbol, updateStatusSymbol } from '../../api/API';

import { IManageSymbolStore, ISymbolStore, ISymbolUploadStore, ManageSymbolsStore, SymbolUploadStore, SymbolsStore } from './SymbolsStore';

export const uploadSvgFileAction = createAsyncAction(
	async ({ svgFile, validationOnly, contentType }) => {
		if (svgFile === null || svgFile === undefined) {
			return errorResult([], 'Missing query');
		}

		if (validationOnly === null || validationOnly === undefined) {
			return errorResult([], 'Missing onlyLatestVersion');
		}

		const validateSvgQuery = await uploadSvgFile(svgFile, validationOnly, contentType);

		return successResult({ validateSvgQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			SymbolUploadStore.update((s: ISymbolUploadStore) => {
				s.validateSvgQuery = result.payload.validateSvgQuery;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const getSymbolsQueryAction = createAsyncAction(
	async () => {
		const symbolsQuery = await getSymbolsQuery();

		return successResult({ symbolsQuery }) as any;
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			SymbolsStore.update((s: ISymbolStore) => {
				s.symbolsQuery = result.payload.symbolsQuery.data;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const getMangeSymbolsQueryAction = createAsyncAction(
	async () => {
		const manageSymbolsQuery = await getManageSymbolsQuery();

		return successResult({ manageSymbolsQuery }) as any;
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageSymbolsQuery = result.payload.manageSymbolsQuery.data;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const deleteMangeSymbolAction = createAsyncAction(
	async ({ id }) => {
		if (id === null || id === undefined) {
			return errorResult([], 'ID');
		}

		const manageDeleteSymbolsQuery = await deleteSymbol(id);

		return successResult({ manageDeleteSymbolsQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageDeleteSymbolsQuery = result.payload.manageDeleteSymbolsQuery;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const updateMangeSymbolAction = createAsyncAction(
	async ({ symbol }) => {
		if (symbol === null || symbol === undefined) {
			return errorResult([], 'Symbol');
		}

		const manageUpdateSymbolsQuery = await updateSymbol(symbol.id, symbol);

		return successResult({ manageUpdateSymbolsQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageUpdateSymbolsQuery = result.payload.manageUpdateSymbolsQuery;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const updateStatusMangeSymbolAction = createAsyncAction(
	async ({ id, data }) => {
		console.log(818, id, data);
		if (id === null || id === undefined || data === null || data === undefined) {
			return errorResult([], 'Symbol');
		}

		const manageUpdateStatusSymbolsQuery = await updateStatusSymbol(id, data);

		return successResult({ manageUpdateStatusSymbolsQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageUpdateStatusSymbolsQuery = result.payload.manageUpdateStatusSymbolsQuery;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);
