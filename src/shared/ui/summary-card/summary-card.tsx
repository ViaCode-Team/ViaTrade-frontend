import type { ReactNode } from 'react';

import {
	Card,
	Skeleton,
	Stack,
	Text,
	Title,
} from '@mantine/core';

import cls from './summary-card.module.css';

export type SummaryCardProps = {
	title: string;
	value?: ReactNode;
	subtitle?: ReactNode;
	color?: string;
	isLoading?: boolean;
};

export function SummaryCard({
	title,
	value,
	subtitle,
	color = 'gray',
	isLoading,
}: SummaryCardProps) {
	return (
		<Card withBorder p={{ base: 'sm', sm: 'md' }} className={cls.card}>
			<Stack gap={4} justify='center'>
				<Text size='xs' c='dimmed' tt='uppercase' fw={700}>
					{title}
				</Text>

				{isLoading
					? (
							<Skeleton height={28} width='50%' radius='sm' />
						)
					: (
							<>
								{value !== undefined && (
									<Title
										order={3}
										fw='bold'
										c={color !== 'gray' ? color : undefined}
										ff='monospace'
										fz={{ base: 'h4', sm: 'h3' }}
									>
										{value}
									</Title>
								)}

								{subtitle && (
									<Text size='xs' c='dimmed'>
										{subtitle}
									</Text>
								)}
							</>
						)}
			</Stack>
		</Card>
	);
}
