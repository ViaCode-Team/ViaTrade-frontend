import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Modal,
	NumberFormatter,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { generatePath, Link as RouterLink } from 'react-router';

import type { Stock } from '@/entities/stock';

import { getStockChangeColor } from '@/entities/stock';
import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { ROUTES } from '@/shared/model/routes';
import { StockLinkedStrategyCard } from '@/widgets/stock-linked-strategies';

import cls from '../stocks-page.module.css';

type StockCardProps = {
	stock: Stock;
};

export function StockCard({ stock }: StockCardProps) {
	const [strategiesModalOpened, strategiesModalHandlers] = useDisclosure(false);
	const stockPath = generatePath(ROUTES.STOCK, {
		stockId: stock.id,
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
		<>
			<Modal
				opened={strategiesModalOpened}
				onClose={strategiesModalHandlers.close}
				title={`Привязанные стратегии ${stock.ticker}`}
				size='xl'
				centered
			>
				<Stack gap='md'>
					<Text size='sm' c='dimmed'>
						Всего привязано:
						{' '}
						<Text span fw='bold' c='var(--mantine-color-text)'>
							{linkedStrategiesCount}
						</Text>
					</Text>

					<SimpleGrid
						minColWidth={300}
						spacing={CONTENT_GRID_SPACING}
						component='ul'
						className={cls.modalStrategiesGrid}
					>
						{stock.linkedStrategies.map((strategy) => (
							<li key={strategy.id} className={cls.modalStrategyItem}>
								<StockLinkedStrategyCard strategy={strategy} />
							</li>
						))}
					</SimpleGrid>
				</Stack>
			</Modal>

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

				<Stack gap={2}>
					<Text size='sm' c='dimmed'>
						Цена
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
				</Stack>

				<Button
					mt='auto'
					type='button'
					variant='default'
					className={cls.strategiesButton}
					onClick={strategiesModalHandlers.open}
				>
					Связанные стратегии (
					{linkedStrategiesCount}
					)
				</Button>
			</Card>
		</>
	);
}
