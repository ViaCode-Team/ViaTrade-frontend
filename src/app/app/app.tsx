import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { releaseBootLoader } from '@/shared/lib/global-loader';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { QueryProvider, ThemeProvider } from '../providers';
import { router } from '../router';

export function App() {
	useEffect(() => {
		releaseBootLoader();
	}, []);

	return (
		<QueryProvider>
			<ThemeProvider>
				<Suspense fallback={<GlobalLoader />}>
					<RouterProvider router={router} />
				</Suspense>
			</ThemeProvider>
		</QueryProvider>
	);
}
