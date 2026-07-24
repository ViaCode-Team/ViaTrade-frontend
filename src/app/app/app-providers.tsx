import type { ReactNode } from 'react';

import { SecurityProvider } from '@/entities/security';

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
					<AppSecurityRuntime>
						<ThemeProvider>
							{children}
						</ThemeProvider>
					</AppSecurityRuntime>
				</QueryProvider>
			</SecurityProvider>
		</PwaProvider>
	);
}
