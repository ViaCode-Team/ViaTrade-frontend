import type { ReactNode } from 'react';

import { AppShell, Box } from '@mantine/core';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';
import { OfflineBanner } from '@/widgets/offline-banner';

import cls from './auth-layout.module.css';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<AppShell header={{ height: 53 }}>
			<AppShell.Header>
				<PureHeader />

				<Box px='sm' py='xs'>
					<OfflineBanner />
				</Box>
			</AppShell.Header>

			<AppShell.Main className={cls.main}>
				{children ?? <Outlet />}
			</AppShell.Main>
		</AppShell>
	);
}
