import type { ResponsePromise } from 'ky';

import {
	getResponseContentType,
	isBlobContentType,
	isFormDataContentType,
	isJsonContentType,
	isTextContentType,
	isUrlEncodedContentType,
} from './content-type';

type ResponseParser = {
	matches: (contentType: string) => boolean;
	parse: <T>(request: ResponsePromise<T>) => Promise<unknown>;
};

const EMPTY_RESPONSE_STATUSES = new Set([204, 205, 304]);

const RESPONSE_PARSERS = [
	{
		matches: isJsonContentType,
		parse: parseJsonData,
	},
	{
		matches: isFormDataContentType,
		parse: parseFormData,
	},
	{
		matches: isUrlEncodedContentType,
		parse: parseUrlEncodedData,
	},
	{
		matches: isTextContentType,
		parse: parseTextData,
	},
	{
		matches: isBlobContentType,
		parse: parseBlobData,
	},
] satisfies ResponseParser[];

const DEFAULT_RESPONSE_PARSER = {
	matches: () => true,
	parse: parseArrayBufferData,
} satisfies ResponseParser;

export async function parseResponseData<T>(
	request: ResponsePromise<T>,
	response: Response,
): Promise<unknown> {
	if (hasEmptyBody(response)) {
		return null;
	}

	return getResponseParser(getResponseContentType(response)).parse(request);
}

function hasEmptyBody(response: Response): boolean {
	return (
		EMPTY_RESPONSE_STATUSES.has(response.status)
		|| response.headers.get('content-length') === '0'
	);
}

function getResponseParser(contentType: string): ResponseParser {
	return RESPONSE_PARSERS.find((parser) => parser.matches(contentType)) ?? DEFAULT_RESPONSE_PARSER;
}

async function parseJsonData<T>(request: ResponsePromise<T>): Promise<unknown> {
	const text = await request.text();

	return text ? JSON.parse(text) : null;
}

async function parseUrlEncodedData<T>(request: ResponsePromise<T>): Promise<URLSearchParams> {
	return new URLSearchParams(await request.text());
}

async function parseFormData<T>(request: ResponsePromise<T>): Promise<FormData> {
	return request.formData();
}

async function parseTextData<T>(request: ResponsePromise<T>): Promise<string> {
	return request.text();
}

async function parseBlobData<T>(request: ResponsePromise<T>): Promise<Blob> {
	return request.blob();
}

async function parseArrayBufferData<T>(request: ResponsePromise<T>): Promise<ArrayBuffer> {
	return request.arrayBuffer();
}
