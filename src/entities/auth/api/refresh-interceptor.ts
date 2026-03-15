import { handleError, interceptors } from '@/shared/api';
import { buildApiUrl } from '@/shared/lib/config';

import { getRefreshUrl } from './gen';

// todo: Запрос идёт на рефреш даже без рефреш и аксесс(он для этого запроса не нужен, но если он есть то зачем делать запрос? response.status !== 401 точно всегда поможет?) токена. Исправить

// Костыль: делаем запрос на refresh только если предыдущий запрос на refresh был успешный
let refreshFailed = false;

interceptors.response.use(async (response, url, options) => {
	if (response.status !== 401 || refreshFailed)
		return response;

	const responseRefresh =	await fetch(buildApiUrl(getRefreshUrl()), { method: 'POST' });

	if (!responseRefresh.ok) {
		refreshFailed = true;
		await handleError(responseRefresh);
	}

	return fetch(url, options);
});
