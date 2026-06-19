import {
	Grid,
	Stack,
	Text,
	Title,
} from '@mantine/core';

import type { Stock } from '@/entities/stock';

import cls from '../stock-page.module.css';

type StockHeroProps = {
	stock: Stock;
};

export function StockHero({ stock }: StockHeroProps) {
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
			<Grid.Col span={12}>
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
		</Grid>
	);
}
