import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import { IS_DEV } from '@/shared/lib/config';

const LazyReactQueryDevtools = IS_DEV
	? lazily(() => import('@tanstack/react-query-devtools')).ReactQueryDevtools
	: null;

export function AppReactQueryDevtools() {
	if (!LazyReactQueryDevtools)
		return null;

	return (
		<Suspense fallback={null}>
			<LazyReactQueryDevtools />
		</Suspense>
	);
}
