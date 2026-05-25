import {
	Flex,
	type FlexProps,
	Text,
	Title,
} from '@mantine/core';

export type EmptyStateProps = {
	title?: React.ReactNode;
	description?: React.ReactNode;
} & FlexProps;

export function EmptyState({
	title = 'Нет данных',
	description,
	...props
}: EmptyStateProps) {
	return (
		<Flex
			direction='column'
			gap='xs'
			justify='center'
			align='center'
			{...props}
		>
			<Title order={4} ta='center'>
				{title}
			</Title>
			{description && (
				<Text size='sm' c='dimmed' ta='center' maw={400}>
					{description}
				</Text>
			)}
		</Flex>
	);
}
