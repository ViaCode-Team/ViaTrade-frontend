import type { ReactNode } from 'react';

import { Stack, Title } from '@mantine/core';

import classes from './AuthLayout.module.css';

type AuthLayoutProps = {
	title: string;
	children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
	return (
		<Stack w='100%' maw={420} align='center' gap='xl' mx='auto'>
			<Title order={1} className={classes.title}>
				{title}
			</Title>

			<Stack w='100%' gap='md'>
				{children}
			</Stack>
		</Stack>
	);
}
