import type { ReactNode } from 'react';

import { Stack, Title } from '@mantine/core';

import cls from './auth-card.module.css';

type AuthLayoutProps = {
	title: string;
	children: ReactNode;
};

export function AuthCard({ title, children }: AuthLayoutProps) {
	return (
		<Stack w='100%' maw={420} align='center' gap='xl'>
			<Title order={1} className={cls.title}>
				{title}
			</Title>

			<Stack w='100%'>
				{children}
			</Stack>
		</Stack>
	);
}
