import type { ReactNode } from 'react';

import { Container, Stack } from '@mantine/core';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

import cls from './auth-layout.module.css';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Stack h='100vh' gap={0}>
			<PureHeader title='Платформа инвестиционного анализа' />

			<Container
				size='xl'
				component='main'
				className={cls.main}
			>
				{children ?? <Outlet />}
			</Container>
		</Stack>
	);
}
