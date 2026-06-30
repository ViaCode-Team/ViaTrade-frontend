const TEXT_APPLICATION_CONTENT_TYPES = new Set([
	'application/csv',
	'application/graphql',
	'application/javascript',
	'application/x-javascript',
	'application/x-ndjson',
	'application/xml',
]);

const BLOB_APPLICATION_CONTENT_TYPES = new Set([
	'application/gzip',
	'application/octet-stream',
	'application/pdf',
	'application/x-7z-compressed',
	'application/x-rar-compressed',
	'application/x-tar',
	'application/zip',
]);

export function getResponseContentType(response: Response): string {
	return response.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase() ?? '';
}

export function isJsonContentType(contentType: string): boolean {
	return (
		contentType === 'application/json'
		|| contentType === 'text/json'
		|| contentType.endsWith('+json')
	);
}

export function isFormDataContentType(contentType: string): boolean {
	return contentType === 'multipart/form-data';
}

export function isUrlEncodedContentType(contentType: string): boolean {
	return contentType === 'application/x-www-form-urlencoded';
}

export function isTextContentType(contentType: string): boolean {
	return (
		contentType.startsWith('text/')
		|| TEXT_APPLICATION_CONTENT_TYPES.has(contentType)
		|| contentType.endsWith('+xml')
	);
}

export function isBlobContentType(contentType: string): boolean {
	return (
		contentType.startsWith('audio/')
		|| contentType.startsWith('font/')
		|| contentType.startsWith('image/')
		|| contentType.startsWith('video/')
		|| contentType.startsWith('application/vnd.')
		|| BLOB_APPLICATION_CONTENT_TYPES.has(contentType)
	);
}
