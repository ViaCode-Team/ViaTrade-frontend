import type { ReactNode } from 'react';

import {
	Card,
	Skeleton,
	Stack,
	Text,
	Title,
} from '@mantine/core';

export type SummaryCardProps = {
	title: string;
	value?: ReactNode;
	description?: ReactNode;
	color?: string;
	isLoading?: boolean;
	descriptionIsLoading?: boolean;
};

export function SummaryCard({
	title,
	value,
	description,
	color = 'gray',
	isLoading,
	descriptionIsLoading,
}: SummaryCardProps) {
	return (
		<Card withBorder p={{ base: 'sm', sm: 'md' }}>
			<Stack gap={4} justify='center'>
				<Text size='xs' c='dimmed' tt='uppercase' fw={700}>
					{title}
				</Text>

				{isLoading
					? (
							<>
								<Skeleton height={30} width='30%' radius='sm' />
								{descriptionIsLoading && (
									<Skeleton height={17} width='70%' radius='sm' />
								)}
							</>
						)
					: (
							<>
								{value !== undefined && (
									<Title
										order={3}
										fw='bold'
										c={color !== 'gray' ? color : undefined}
										ff='monospace'
									>
										{value}
									</Title>
								)}

								{description !== undefined && (
									<Text size='xs' c='dimmed'>
										{description}
									</Text>
								)}
							</>
						)}
			</Stack>
		</Card>
	);
}
