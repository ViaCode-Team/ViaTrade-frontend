import { Box, Card, Flex, Skeleton } from '@mantine/core';

import cls from './signal-card.module.css';

export function SignalCardSkeleton() {
	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			className={cls.root}
		>
			<Flex gap='xs'>
				<Box flex={1}>
					<Skeleton height={24} width='50%' mb={4} />
					<Skeleton height={20} width='80%' />
				</Box>
				<Skeleton height={20} width={64} radius='sm' />
			</Flex>

			<Flex gap='xs'>
				<Flex direction='column' flex={1} align='flex-start' gap={4}>
					<Skeleton height={20} width='70%' />
					<Skeleton height={24} width='50%' />
				</Flex>
				<Flex direction='column' flex={1} align='flex-end' gap={4}>
					<Skeleton height={20} width='70%' />
					<Skeleton height={24} width='60%' />
				</Flex>
			</Flex>

			<Flex direction='column' gap={4} mt='auto'>
				<Flex justify='space-between' wrap='nowrap'>
					<Skeleton height={20} width='45%' />
					<Skeleton height={20} width='15%' />
				</Flex>
				<Skeleton height={8} radius='xl' />
			</Flex>

			<Flex justify='space-between' align='center'>
				<Skeleton height={20} width='40%' />
				<Skeleton height={16} width={16} radius='sm' />
			</Flex>
		</Card>
	);
}
