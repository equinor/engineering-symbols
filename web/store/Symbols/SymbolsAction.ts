import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { uploadSvgFile, symbolsQuery } from '../../api/API';

import { ISymbolStore, ISymbolUploadStore, SymbolUploadStore, SymbolStore } from './SymbolsStore';

export const validateSvgFileAction = createAsyncAction(
	async ({ query }) => {
		if (query === null || query === undefined) {
			return errorResult([], 'Missing query');
		}

		const data = await uploadSvgFile(query);

		return successResult({
			validateSvgQuery: data,
		});
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
		const data = await symbolsQuery();

		return successResult({
			symbolsQuery: data.data,
		});
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
