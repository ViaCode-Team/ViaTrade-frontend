import {
	Card,
	Flex,
	Group,
	Skeleton,
	Stack,
} from '@mantine/core';

export function StrategyInfoCardSkeleton() {
	return (
		<Card>
			<Flex direction='column' gap='sm'>
				<Group gap='xs' align='center' wrap='nowrap'>
					<Skeleton height={26} width={26} radius='sm' />
					<Skeleton height={28} width='60%' />
				</Group>

				<Stack gap={6}>
					<Skeleton height={20} width='100%' />
					<Skeleton height={20} width='100%' />
					<Skeleton height={20} width='80%' />
				</Stack>
			</Flex>
		</Card>
	);
}
