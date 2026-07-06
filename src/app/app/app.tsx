import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { releaseBootLoader } from '@/shared/lib/global-loader';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { router } from '../router';
import { AppProviders } from './app-providers';

export function App() {
	useEffect(() => {
		releaseBootLoader();
	}, []);

	return (
		<AppProviders>
			<Suspense fallback={<GlobalLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</AppProviders>
	);
}
