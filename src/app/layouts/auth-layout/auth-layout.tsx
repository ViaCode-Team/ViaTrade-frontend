import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

type AuthLayoutProps = { children?: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<Stack height={1}>
			<PureHeader />

			<Stack alignItems='center' justifyContent='center' flex={1}>
				{children ?? <Outlet />}
			</Stack>
		</Stack>
	);
};
