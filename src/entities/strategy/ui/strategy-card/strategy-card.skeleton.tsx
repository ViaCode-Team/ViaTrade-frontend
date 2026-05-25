import { Box, Card, Flex, Skeleton } from '@mantine/core';

import cls from './strategy-card.module.css';

export type StrategyCardSkeletonProps = {
	withButton?: boolean;
};

export function StrategyCardSkeleton({ withButton = true }: StrategyCardSkeletonProps) {
	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			className={cls.root}
		>
			<Flex direction='column' gap='xs'>
				<Flex justify='space-between' align='flex-start' gap='xs'>
					<Skeleton height={24} width='60%' />
					<Skeleton height={24} width={24} radius='sm' />
				</Flex>

				<Box>
					<Skeleton height={20} width='100%' mb={4} />
					<Skeleton height={20} width='80%' />
				</Box>
			</Flex>

			<Flex gap='sm' mt='auto'>
				<Flex direction='column' flex={1} align='flex-start' gap={4}>
					<Skeleton height={20} width='70%' />
					<Skeleton height={24} width='40%' />
				</Flex>
				<Flex direction='column' flex={1} align='flex-end' gap={4}>
					<Skeleton height={20} width='70%' />
					<Skeleton height={24} width='50%' />
				</Flex>
			</Flex>

			<Flex direction='column' gap={4}>
				<Flex justify='space-between' wrap='nowrap'>
					<Skeleton height={20} width='30%' />
					<Skeleton height={20} width='15%' />
				</Flex>
				<Skeleton height={8} radius='xl' />
			</Flex>

			{withButton && (
				<Skeleton height={36} mt='auto' radius='sm' />
			)}
		</Card>
	);
}
