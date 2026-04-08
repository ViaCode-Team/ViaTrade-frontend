import type { ReactNode } from 'react';

import { Group, Paper, Text, Title } from '@mantine/core';

import cls from '../dashboard-page.module.css';

type StatCardProps = {
	icon: ReactNode;
	title: string;
	value: string | number;
	subtitle?: string;
};

export function StatCard({ icon, title, value, subtitle }: StatCardProps) {
	return (
		<Paper className={cls.statCard} withBorder p='lg'>
			<Group gap='sm' mb='sm'>
				<div className={cls.iconWrapper}>
					{icon}
				</div>
				<Text size='sm' c='dimmed'>
					{title}
				</Text>
			</Group>
			<div>
				<Title order={3} fw='bold'>
					{value}
				</Title>
				{subtitle && (
					<Text size='xs' c='dimmed'>
						{subtitle}
					</Text>
				)}
			</div>
		</Paper>
	);
}
