import {
	Box,
	Button,
	Card,
	Flex,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import { ROUTES } from '@/shared/model';

import type { Stock } from '../../model';

import cls from './stock-card.module.css';

type StockCardProps = {
	stock: Stock;
	onLinkedStrategiesClick: () => void;
};

export function StockCard({
	stock,
	onLinkedStrategiesClick,
}: StockCardProps) {
	const stockPath = generatePath(ROUTES.STOCK, {
		stockId: stock.id,
	});

	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			className={cls.stockCard}
		>
			<RouterLink
				to={stockPath}
				className={cls.cardLink}
				aria-label={`Открыть страницу акции ${stock.ticker}`}
			/>

			<Flex gap='xs'>
				<Box flex={1} className={cls.stockTitle}>
					<Title order={4} lineClamp={1} className={cls.ticker}>
						{stock.ticker}
					</Title>
					<Text size='sm' c='dimmed' lineClamp={1}>
						{stock.name}
					</Text>
				</Box>
			</Flex>

			<Button
				mt='auto'
				type='button'
				variant='default'
				className={cls.strategiesButton}
				onClick={onLinkedStrategiesClick}
			>
				Связанные стратегии
			</Button>
		</Card>
	);
}
