import {
	Badge,
	Flex,
	Grid,
	Group,
	NumberFormatter,
	Stack,
	Text,
	Title,
} from '@mantine/core';

import type { Stock } from '@/entities/trade-code/stock';

import { getStockChangeColor } from '@/entities/trade-code/stock';

import cls from '../stock-page.module.css';

type StockHeroProps = {
	stock: Stock;
};

export function StockHero({ stock }: StockHeroProps) {
	const changeColor = getStockChangeColor(stock.dayChangePercent);

	return (
		<Grid
			gap='lg'
			type='container'
			breakpoints={{
				xs: '36em',
				sm: '48em',
				md: '62em',
				lg: '75em',
				xl: '88em',
			}}
		>
			<Grid.Col span={{ base: 12, md: 8 }}>
				<Stack gap='md'>
					<Stack gap={4} className={cls.titleBlock}>
						<Title order={1} className={cls.pageTitle}>
							{stock.ticker}
						</Title>

						<Text size='lg'>
							{stock.name}
						</Text>
					</Stack>
				</Stack>
			</Grid.Col>

			<Grid.Col span={{ base: 12, md: 4 }}>

				<Group>
					<Flex direction='column' flex={1}>
						<Text c='dimmed'>
							Последняя цена
						</Text>

						<Title order={3}>
							<NumberFormatter
								value={stock.price}
								suffix=' ₽'
								decimalScale={2}
								fixedDecimalScale
								thousandSeparator
							/>
						</Title>
					</Flex>

					<Badge color={changeColor} variant='light' size='lg' style={{ justifySelf: 'flex-end' }}>
						{stock.dayChangePercent > 0 ? '+' : ''}
						<NumberFormatter
							value={stock.dayChangePercent}
							decimalScale={2}
							fixedDecimalScale
							suffix='% за день'
						/>
					</Badge>

				</Group>
			</Grid.Col>
		</Grid>
	);
}
