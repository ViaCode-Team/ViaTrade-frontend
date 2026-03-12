import { handleError, interceptors } from '@/shared/api';

interceptors.response.use(async (response, url, options) => {
	if (response.status !== 401)
		return response;

	const responseRefresh =	await fetch('/api/Auth/refresh', { method: 'POST' });

	if (!responseRefresh.ok) {
		await handleError(responseRefresh);
	}

	return fetch(url, options);
});
