import { fetchApi, fetchFileApi } from './fetchAPI';

let environment = 'dev';

if (typeof window !== 'undefined') {
	const prodUrl = 'engineering-symbols.equinor.com';
	console.log('window.location', window.location);
	environment = window.location.origin.includes(prodUrl) ? 'prod' : 'dev';
}

export const uploadSvgFile = (svgFile: FormData, validationOnly: boolean, contentType: string) =>
	fetchFileApi({
		path: `https://${environment}-engsym-api.azurewebsites.net/manage/symbols?validationOnly=${validationOnly}`,
		data: svgFile,
		contentType,
	});

export const getSymbolsQuery = () => fetchApi({ path: `https://${environment}-engsym-api.azurewebsites.net/symbols?onlyLatestVersion=false` });

export const getManageSymbolsQuery = () =>
	fetchApi({ path: `https://${environment}-engsym-api.azurewebsites.net/manage/symbols?onlyLatestVersion=false` });

export const deleteSymbol = (id: string) =>
	fetchApi({ path: `https://${environment}-engsym-api.azurewebsites.net/manage/symbols/${id}`, method: 'delete' });

// New svg only (?)
export const updateSymbol = (id: string, data: string) =>
	fetchFileApi({
		path: `https://${environment}-engsym-api.azurewebsites.net/manage/symbols${id ? `/${id}` : ''}`,
		data,
		contentType: 'application/json',
		method: id ? 'put' : 'post',
	});

export const updateStatusSymbol = (id: string, data: string) =>
	fetchFileApi({
		path: `https://${environment}-engsym-api.azurewebsites.net/manage/symbols/${id}/status`,
		data,
		contentType: 'application/json',
		method: 'put',
	});
