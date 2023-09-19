import { fetchApi, fetchFileApi } from './fetchAPI';

export const uploadSvgFile = (svgFile: FormData, validationOnly: boolean, contentType: string) =>
	fetchFileApi({ path: `https://dev-engsym-api.azurewebsites.net/manage/symbols?validationOnly=${validationOnly}`, data: svgFile, contentType });

export const getSymbolsQuery = () => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/symbols?onlyLatestVersion=false' });

export const getManageSymbolsQuery = () => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/manage/symbols?onlyLatestVersion=false' });

export const deleteSymbol = (id: string) => fetchApi({ path: `https://dev-engsym-api.azurewebsites.net/manage/symbols/${id}`, method: 'delete' });

export const updateSymbol = (id: string, data: string) =>
	fetchFileApi({ path: `https://dev-engsym-api.azurewebsites.net/manage/symbols/${id}`, data, contentType: 'application/json', method: 'put' });

export const updateStatusSymbol = (id: string, data: string) =>
	fetchFileApi({
		path: `https://dev-engsym-api.azurewebsites.net/manage/symbols/${id}/status`,
		data,
		contentType: 'application/json',
		method: 'put',
	});
