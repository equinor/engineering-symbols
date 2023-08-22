import fetchApi from './fetchAPI';

export const uploadSvgFile = (formData: FormData) => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/symbols', method: 'post', formData });

export const symbolsQuery = () => fetchApi({ path: 'https://dev-engsym-api.azurewebsites.net/symbols' });
