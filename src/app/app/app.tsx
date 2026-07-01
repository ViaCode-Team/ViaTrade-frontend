import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { SecurityProvider, SecuritySessionLockout } from '@/entities/security';
import { InactivityLock } from '@/features/security/inactivity-lock';
import { releaseBootLoader } from '@/shared/lib/global-loader';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { PwaProvider, QueryProvider, ThemeProvider } from '../providers';
import { router } from '../router';

export function App() {
	useEffect(() => {
		releaseBootLoader();
	}, []);

	return (
		<PwaProvider>
			<SecurityProvider>
				<QueryProvider>
					<ThemeProvider>
						<Suspense fallback={<GlobalLoader />}>
							<SecuritySessionLockout />
							<InactivityLock />
							<RouterProvider router={router} />
						</Suspense>
					</ThemeProvider>
				</QueryProvider>
			</SecurityProvider>
		</PwaProvider>
	);
}
