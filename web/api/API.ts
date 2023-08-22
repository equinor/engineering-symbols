import fetchApi from './fetchAPI';

export const uploadSvgFile = (formData: FormData) => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/symbols', method: 'post', formData });

export const getSymbolsQuery = () => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/symbols' });
