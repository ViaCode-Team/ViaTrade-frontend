export const PROJECT_STORAGE_KEY_PREFIX = 'viatrade';

export function createStorageKey(...parts: Array<number | string>) {
	return [PROJECT_STORAGE_KEY_PREFIX, ...parts]
		.map(normalizeStorageKeyPart)
		.filter(Boolean)
		.join('_');
}

function normalizeStorageKeyPart(part: number | string) {
	return String(part)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');
}
