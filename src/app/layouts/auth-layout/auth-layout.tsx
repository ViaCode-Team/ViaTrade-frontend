import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';

import { PureHeader } from '@/widgets/header';

type AuthLayoutProps = { children?: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<>
			<PureHeader />

			<Stack>{children ?? <Outlet />}</Stack>
		</>
	);
};
