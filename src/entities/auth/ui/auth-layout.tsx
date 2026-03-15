import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type AuthLayoutProps = {
	title: string;
	children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
	return (
		<Stack width={1} alignItems='center' gap={6}>
			<Typography
				variant='h2'
				component='h1'
				sx={{
					'@media (max-width: 425px)': {
						fontSize: 46,
					},
					'@media (max-width: 320px)': {
						fontSize: 36,
					},
				}}
			>
				{title}
			</Typography>

			<Stack width={1} maxWidth={460} gap={3}>
				{children}
			</Stack>
		</Stack>
	);
}
