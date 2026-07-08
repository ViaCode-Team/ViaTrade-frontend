import type { KyInstance } from 'ky';

import ky, { isHTTPError } from 'ky';

import { BASE_URL } from '@/shared/config';

import { createHttpApiError } from './errors';
import { getBlockedApiRequestResponse } from './request-gate';
import { canRetryUnauthorizedRequest, retryUnauthorizedRequest } from './unauthorized-retry';

function createApiClient(): KyInstance {
	return ky.create({
		prefix: BASE_URL || undefined,
		retry: {
			limit: 1,
			shouldRetry: () => false,
		},
		hooks: {
			beforeRequest: [
				({ request }) => getBlockedApiRequestResponse(request),
			],
			afterResponse: [
				({ request, response, retryCount }) => {
					if (!canRetryUnauthorizedRequest(response, retryCount)) {
						return;
					}

					return retryUnauthorizedRequest(request);
				},
			],
			beforeError: [
				({ error }) => {
					if (isHTTPError(error)) {
						return createHttpApiError(error);
					}

					return error;
				},
			],
		},
	});
}

export const apiClient = createApiClient();
