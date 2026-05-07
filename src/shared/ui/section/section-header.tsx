import type { ReactNode } from 'react';

import {
	Flex,
	Stack,
	Text,
	Title,
} from '@mantine/core';

type SectionTitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export type SectionHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	titleOrder?: SectionTitleOrder;
};

export function SectionHeader({
	title,
	description,
	actions,
	titleOrder = 2,
}: SectionHeaderProps) {
	return (
		<Flex justify='space-between' align='flex-start' gap='md' wrap='wrap'>
			<Stack gap={4}>
				<Title order={titleOrder}>{title}</Title>

				{description && (
					<Text size='sm' c='dimmed'>
						{description}
					</Text>
				)}
			</Stack>

			{actions}
		</Flex>
	);
}
