import type { ReactNode } from 'react';

import { SecurityProvider } from '@/entities/security';
import { CurrentUserQueryProvider } from '@/shared/lib/auth';

import { PwaProvider, QueryProvider, ThemeProvider } from '../config';
import { AppSecurityRuntime } from '../security';

type AppProvidersProps = {
	children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<PwaProvider>
			<SecurityProvider>
				<QueryProvider>
					<CurrentUserQueryProvider>
						<AppSecurityRuntime>
							<ThemeProvider>
								{children}
							</ThemeProvider>
						</AppSecurityRuntime>
					</CurrentUserQueryProvider>
				</QueryProvider>
			</SecurityProvider>
		</PwaProvider>
	);
}
