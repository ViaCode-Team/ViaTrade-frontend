import type { ReactNode } from 'react';

import { Container, Stack } from '@mantine/core';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

import classes from './AuthLayout.module.css';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Stack h='100vh' gap={0}>
			<PureHeader title='Платформа инвестиционного анализа' />

			<Container
				size='xl'
				component='main'
				className={classes.main}
			>
				{children ?? <Outlet />}
			</Container>
		</Stack>
	);
}
