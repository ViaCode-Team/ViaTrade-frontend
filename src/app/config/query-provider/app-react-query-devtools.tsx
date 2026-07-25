import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import { IS_DEV } from '@/shared/config';

const LazyReactQueryDevtools = IS_DEV && lazily(() => import('@tanstack/react-query-devtools')).ReactQueryDevtools;

export function AppReactQueryDevtools() {
	if (!LazyReactQueryDevtools)
		return null;

	return (
		<Suspense fallback={null}>
			<LazyReactQueryDevtools />
		</Suspense>
	);
}
