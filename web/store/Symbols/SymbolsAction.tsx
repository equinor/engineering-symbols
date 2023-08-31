import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { uploadSvgFile, getSymbolsQuery } from '../../api/API';

import { ISymbolStore, ISymbolUploadStore, SymbolUploadStore, SymbolStore } from './SymbolsStore';

export const validateSvgFileAction = createAsyncAction(
	async ({ query }) => {
		if (query === null || query === undefined) {
			return errorResult([], 'Missing query');
		}

		const validateSvgQuery = await uploadSvgFile(query);

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

		return successResult({ symbolsQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			SymbolStore.update((s: ISymbolStore) => {
				s.symbolsQuery = result.payload.symbolsQuery;
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);
