import { useLayoutEffect } from 'react';

import {
	acquireGlobalLoader,
	releaseGlobalLoader,
} from '@/shared/lib/global-loader';

export function GlobalLoader() {
	useLayoutEffect(() => {
		const token = acquireGlobalLoader();

		return () => {
			releaseGlobalLoader(token);
		};
	}, []);

	return null;
}
