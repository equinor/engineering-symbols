import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { uploadSvgFile, getSymbolsQuery, getManageSymbolsQuery, deleteSymbol, updateSymbol, updateStatusSymbol } from '../../api/API';

import { IManageSymbolStore, ISymbolStore, ISymbolUploadStore, ManageSymbolsStore, SymbolUploadStore, SymbolsStore } from './SymbolsStore';
import { ConnectionPoint, concatenateErrorMessages, getApiStructure, jsonLdResponseToDto } from '../../helpers';
import { SymbolsProps } from '../../types';

const hasSucceededReposnse = (status: number) => status !== undefined && (status === 200 || status === 201 || status === 204);

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

			let errorMessage: string | null = null;
			const { validateSvgQuery } = result.payload as any;

			if (!hasSucceededReposnse(validateSvgQuery?.status)) {
				errorMessage = concatenateErrorMessages(validateSvgQuery?.data?.errors);
			}

			const { data, ...rest } = validateSvgQuery;
			const { id, shape, identifier, connectionPoints, ...rst } = data;
			const updValidateSvgQuery = {
				...rst,
				key: validateSvgQuery.config.data.name.replace('.svg', ''),
				// HOTFIX: no ID -> PUT
				// id: identifier,
				geometry: shape.serializations.map(({ value }: any) => value),
				connectors:
					connectionPoints.length > 0
						? connectionPoints.map(({ identifier, position, direction }: ConnectionPoint) => ({
								id: identifier,
								relativePosition: position,
								direction,
						  }))
						: [],
			};

			SymbolUploadStore.update((s: ISymbolUploadStore) => {
				s.validateSvgQuery = { data: updValidateSvgQuery, ...rest };
				s.validateSvgErrorMessage = errorMessage;
				s.isSymbolUploadReposnseSucceeded = hasSucceededReposnse(validateSvgQuery.status);
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const updateSymbolAction = createAsyncAction(
	async ({ symbol, validationOnly, contentType }) => {
		if (symbol === null || symbol === undefined) {
			return errorResult([], 'Missing query');
		}

		if (validationOnly === null || validationOnly === undefined) {
			return errorResult([], 'Missing onlyLatestVersion');
		}

		const validateSvgQuery = await uploadSvgFile(getApiStructure(symbol), validationOnly, contentType);

		return successResult({ validateSvgQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			let errorMessage: string | null = null;
			const { validateSvgQuery } = result.payload as any;

			if (!hasSucceededReposnse(validateSvgQuery?.status)) {
				errorMessage = concatenateErrorMessages(validateSvgQuery?.data?.errors);
			}

			const { data, ...rest } = validateSvgQuery;

			SymbolUploadStore.update((s: ISymbolUploadStore) => {
				s.validateSvgQuery = { data: jsonLdResponseToDto(data), ...rest };
				s.validateSvgErrorMessage = errorMessage;
				s.isSymbolUploadReposnseSucceeded = hasSucceededReposnse(validateSvgQuery.status);
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
				s.symbolsQuery = jsonLdResponseToDto(result.payload.symbolsQuery.data);
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const getManageSymbolsQueryAction = createAsyncAction(
	async () => {
		const manageSymbolsQuery = await getManageSymbolsQuery();

		return successResult({ manageSymbolsQuery }) as any;
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageSymbolsQuery = jsonLdResponseToDto(result.payload.manageSymbolsQuery.data) as unknown as SymbolsProps[];
				// s.manageSymbolsQuery = result.payload.manageSymbolsQuery.data.map((symbol: any) => ({
				// 	...symbol,
				// 	connectors: symbol.connectors.map((connector: any) => ({ ...connector, name: connector.id })),
				// }));
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

			let errorMessage: string | null = null;
			const { manageDeleteSymbolsQuery } = result.payload as any;

			if (!hasSucceededReposnse(manageDeleteSymbolsQuery?.status)) {
				errorMessage = concatenateErrorMessages(manageDeleteSymbolsQuery?.data?.errors);
			}

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageDeleteSymbolsQuery = manageDeleteSymbolsQuery;
				s.manageSymbolErrorMessage = errorMessage;
				s.isDeleteSymbolReposnseSucceeded = hasSucceededReposnse(manageDeleteSymbolsQuery.status);
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const updateManageSymbolAction = createAsyncAction(
	async ({ symbol }) => {
		if (symbol === null || symbol === undefined) {
			return errorResult([], 'Symbol');
		}

		// TODO: Remove this hack
		const s = symbol as SymbolsProps;
		// const a = { ...s, connectors: s.connectors.map((c) => ({ ...c, id: c.name })) };

		const manageUpdateSymbolsQuery = await updateSymbol(symbol.id, JSON.stringify(getApiStructure(s)));

		return successResult({ manageUpdateSymbolsQuery });
	},
	{
		postActionHook: ({ result }) => {
			if (result.error) return;

			let errorMessage: string | null = null;
			const { manageUpdateSymbolsQuery } = result.payload as any;

			if (!hasSucceededReposnse(manageUpdateSymbolsQuery?.status)) {
				errorMessage = concatenateErrorMessages(manageUpdateSymbolsQuery?.data?.errors);
			}

			ManageSymbolsStore.update((s: IManageSymbolStore) => {
				s.manageUpdateSymbolsQuery = manageUpdateSymbolsQuery;
				s.manageSymbolErrorMessage = errorMessage;
				s.isUpdateSymbolReposnseSucceeded = hasSucceededReposnse(manageUpdateSymbolsQuery.status);
			});
		},
		cacheBreakHook: () => true, // Always fetch fresh data from api
	}
);

export const updateStatusMangeSymbolAction = createAsyncAction(
	async ({ id, data }) => {
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
