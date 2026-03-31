export const IS_DEV = Boolean(import.meta.env && import.meta.env.DEV);

export const BASE_URL = IS_DEV
	? import.meta.env.VITE_API_BASE_URL_DEV
	: import.meta.env.VITE_API_BASE_URL_PROD;

// Вынесены на уровень модуля
const TRAILING_SLASH_REGEX = /\/$/;
const LEADING_SLASH_REGEX = /^\//;

/**
 * Joins base URL with endpoint path, handling slashes correctly
 * @param endpoint - API endpoint path (e.g., '/users' or 'users')
 * @returns Full URL
 */
export function buildApiUrl(endpoint: string): string {
	const base = BASE_URL?.replace(TRAILING_SLASH_REGEX, '') || '';
	const path = endpoint.replace(LEADING_SLASH_REGEX, '');

	return `${base}/${path}`;
}
