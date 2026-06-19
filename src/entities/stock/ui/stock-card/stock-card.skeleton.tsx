import { Box, Card, Flex, Skeleton } from '@mantine/core';

import cls from './stock-card.module.css';

export function StockCardSkeleton() {
	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			className={cls.stockCard}
		>
			<Flex gap='xs'>
				<Box flex={1}>
					<Skeleton height={24} width='50%' mb={4} />
					<Skeleton height={20} width='80%' />
				</Box>
			</Flex>

			<Skeleton height={36} mt='auto' radius='sm' />
		</Card>
	);
}
