import type { ReactNode } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

type AuthLayoutProps = { children?: ReactNode };

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Stack height={1}>
			<PureHeader title='Платформа инвестиционного анализа' />

			<Container
				maxWidth='xl'
				component='main'
				sx={{
					display: 'flex',
					alignItems: 'center',
					flex: 1,
				}}
			>
				{children ?? <Outlet />}
			</Container>
		</Stack>
	);
}
