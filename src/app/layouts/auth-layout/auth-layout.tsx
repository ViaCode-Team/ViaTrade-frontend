import type { ReactNode } from 'react';

import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';

import { APP_SHELL_PADDING } from '@/shared/model/layout';
import { PureHeader } from '@/widgets/header';
import { OfflineBanner } from '@/widgets/offline-banner';

import cls from './auth-layout.module.css';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<AppShell header={{ height: 53 }} padding={APP_SHELL_PADDING}>
			<AppShell.Header>
				<PureHeader />
				<OfflineBanner />
			</AppShell.Header>

			<AppShell.Main className={cls.main}>
				{children ?? <Outlet />}
			</AppShell.Main>
		</AppShell>
	);
}
