import axios, { AxiosResponse } from 'axios';
import { getMsGraph } from '../utils/MsGraphApiCall';

type FetchApiProps = {
	contentType?: string;
	method?: 'get' | 'post' | 'delete' | 'put';
	path: string;
	data?: any;
};

type PromiseApiProps = {
	statusText?: string;
	status?: number;
	data?: any;
};

export const fetchApi = async ({ path, method = 'get', contentType = 'application/json' }: FetchApiProps): Promise<PromiseApiProps | unknown> => {
	const rt = await getMsGraph();

	try {
		const options: any = {
			headers: {
				'Content-Type': contentType,
				Authorization: rt?.bearer,
			},
		};

		const response: AxiosResponse = await axios[method](path, options);

		return await response;
	} catch ({ response }: any) {
		return response;
	}
};

export const fetchFileApi = async ({
	path,
	data,
	contentType = 'image/svg+xml',
	method = 'post',
}: FetchApiProps): Promise<PromiseApiProps | unknown> => {
	const rt = await getMsGraph();

	try {
		const options: any = {
			headers: {
				'Content-Type': contentType,
				Authorization: rt?.bearer,
			},
		};

		const response: AxiosResponse = await axios[method](path, data, options);

		return await response;
	} catch ({ response }: any) {
		return response;
	}
};
