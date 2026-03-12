/* eslint-disable react/no-unnecessary-use-prefix */
export type RequestInterceptor = (
	url: string,
	options: RequestInit,
) => Promise<[string, RequestInit]> | [string, RequestInit];

export type ResponseInterceptor = (
	response: Response,
	url: string,
	options: RequestInit,
) => Promise<Response> | Response;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const interceptors = {
	request: {
		use(interceptor: RequestInterceptor) {
			requestInterceptors.push(interceptor);
		},
	},

	response: {
		use(interceptor: ResponseInterceptor) {
			responseInterceptors.push(interceptor);
		},
	},
};

export async function runRequestInterceptors(
	url: string,
	options: RequestInit,
): Promise<[string, RequestInit]> {
	for (const interceptor of requestInterceptors) {
		[url, options] = await interceptor(url, options);
	}

	return [url, options];
}

export async function runResponseInterceptors(
	response: Response,
	url: string,
	options: RequestInit,
): Promise<Response> {
	for (const interceptor of responseInterceptors) {
		response = await interceptor(response, url, options);
	}

	return response;
}
