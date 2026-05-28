import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	NumberFormatter,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';

import type { Stock } from '../../model';

import { getStockChangeColor } from '../../model';
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
		stockId: stock.ticker.toLowerCase(),
	});
	const changeColor = getStockChangeColor(stock.dayChangePercent);
	const isGrowth = stock.dayChangePercent >= 0;
	const linkedStrategiesCount = stock.linkedStrategies.length;
	const leftBorderStyle = getLeftBorderCardStyle({
		color: isGrowth
			? 'var(--mantine-color-green-light)'
			: 'var(--mantine-color-red-light)',
		hoverColor: isGrowth
			? 'var(--mantine-color-green-filled)'
			: 'var(--mantine-color-red-filled)',
	});

	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			variant='left-border'
			style={leftBorderStyle}
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

				<Badge
					variant='light'
					color={changeColor}
					className={cls.changeBadge}
				>
					{stock.dayChangePercent > 0 ? '+' : ''}
					<NumberFormatter
						value={stock.dayChangePercent}
						decimalScale={2}
						fixedDecimalScale
						suffix='%'
					/>
				</Badge>
			</Flex>

			<Box>
				<Text size='sm' c='dimmed'>
					Последняя цена
				</Text>

				<Text fw={700} size='lg'>
					<NumberFormatter
						value={stock.price}
						prefix='$'
						decimalScale={2}
						fixedDecimalScale
						thousandSeparator
					/>
				</Text>
			</Box>

			<Button
				mt='auto'
				type='button'
				variant='default'
				className={cls.strategiesButton}
				onClick={onLinkedStrategiesClick}
			>
				Связанные стратегии (
				{linkedStrategiesCount}
				)
			</Button>
		</Card>
	);
}
