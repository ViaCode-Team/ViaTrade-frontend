import type { ReactNode } from 'react';

import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

import cls from './auth-layout.module.css';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<AppShell header={{ height: 53 }} padding={{ base: 'xs', xs: 'sm', sm: 'md' }}>
			<AppShell.Header>
				<PureHeader />
			</AppShell.Header>

			<AppShell.Main className={cls.main}>
				{children ?? <Outlet />}
			</AppShell.Main>
		</AppShell>
	);
}
