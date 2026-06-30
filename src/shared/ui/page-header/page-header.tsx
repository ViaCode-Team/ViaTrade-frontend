import type { ReactNode } from 'react';

import { Flex, Text, Title } from '@mantine/core';

export type PageHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	rightSection?: ReactNode;
};

export function PageHeader({ title, description, rightSection }: PageHeaderProps) {
	return (
		<Flex justify='space-between' align='flex-start' gap='md' wrap='wrap'>
			<Flex direction='column'>
				<Title order={1}>{title}</Title>
				{description && (
					<Text c='dimmed'>
						{description}
					</Text>
				)}
			</Flex>

			{rightSection && (
				<div>
					{rightSection}
				</div>
			)}
		</Flex>
	);
}
