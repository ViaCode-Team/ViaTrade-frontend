import type { ReactNode } from 'react';

import {
	Card,
	Flex,
	Group,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';

type StrategyInfoSectionProps = {
	icon: ReactNode;
	title: string;
	description: string;
};

export function StrategyInfoCard({
	icon,
	title,
	description,
}: StrategyInfoSectionProps) {
	return (
		<Card>
			<Flex direction='column' gap='sm'>
				<Group gap='xs' align='center' wrap='nowrap'>
					<ThemeIcon size='lg' variant='light'>
						{icon}
					</ThemeIcon>

					<Title order={3}>{title}</Title>
				</Group>

				<Text size='sm' c='dimmed'>
					{description}
				</Text>
			</Flex>
		</Card>
	);
}
