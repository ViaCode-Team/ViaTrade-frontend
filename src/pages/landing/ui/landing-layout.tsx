import type { ReactNode } from 'react';

import { AppShell, Box, Container } from '@mantine/core';

import { PureHeader } from '@/widgets/header';
import { OfflineBanner } from '@/widgets/offline-banner';

import { DecorativeBackground } from './decorative-background';
import { Footer } from './footer';

export function LandingLayout({ children }: { children: ReactNode }) {
	return (
		<AppShell header={{ height: 53 }}>
			<AppShell.Header>
				<PureHeader />

				<Box px='sm' py='xs'>
					<OfflineBanner />
				</Box>
			</AppShell.Header>

			<AppShell.Main>
				<Box pos='relative'>
					<DecorativeBackground />
					<Container size='lg'>
						{children}
					</Container>
					<Footer />
				</Box>
			</AppShell.Main>
		</AppShell>
	);
}
