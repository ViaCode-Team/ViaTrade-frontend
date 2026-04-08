import type { ReactNode } from 'react';

import { Stack, Title } from '@mantine/core';

import cls from './auth-layout.module.css';

type AuthLayoutProps = {
	title: string;
	children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
	return (
		<Stack w='100%' maw={420} align='center' gap='xl' mx='auto'>
			<Title order={1} className={cls.title}>
				{title}
			</Title>

			<Stack w='100%' gap='md'>
				{children}
			</Stack>
		</Stack>
	);
}
