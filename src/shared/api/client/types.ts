export type ApiClientOptions = RequestInit;

export type ApiResponse<Data> = {
	data: Data;
	headers: Headers;
	status: number;
};
