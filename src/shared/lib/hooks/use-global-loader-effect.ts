import { useLayoutEffect } from 'react';

import {
	acquireGlobalLoader,
	releaseGlobalLoader,
} from '@/shared/lib/global-loader';

export function useGlobalLoaderEffect() {
	useLayoutEffect(() => {
		const token = acquireGlobalLoader();

		return () => {
			releaseGlobalLoader(token);
		};
	}, []);
}
