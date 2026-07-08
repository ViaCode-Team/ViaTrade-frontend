export const IS_DEV = Boolean(import.meta.env && import.meta.env.DEV);

export const BASE_URL = IS_DEV
	? import.meta.env.VITE_API_BASE_URL_DEV
	: import.meta.env.VITE_API_BASE_URL_PROD;
