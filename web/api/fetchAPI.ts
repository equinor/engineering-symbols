import axios, { AxiosResponse } from 'axios';
import { getMsGraph } from '../utils/MsGraphApiCall';

type FetchApiProps = {
	method?: 'get' | 'post';
	path: string;
	formData?: {};
};

type PromiseApiProps = {
	statusText?: string;
	status?: number;
	data?: any;
};

const fetchApi = async ({ path, method = 'get', formData }: FetchApiProps): Promise<PromiseApiProps | unknown> => {
	const rt = await getMsGraph();

	try {
		const options: any = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: rt?.bearer,
			},
		};

		const response: AxiosResponse = await axios[method](path, formData, options);

		return await response;
	} catch ({ response }: any) {
		return response;
	}
};

export default fetchApi;
