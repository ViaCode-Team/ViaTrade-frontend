import type { ReactNode } from 'react';

import {
	Card,
	Flex,
	NumberFormatter,
	SimpleGrid,
	Stack,
	Text,
} from '@mantine/core';
import {
	IconArrowDownRight,
	IconArrowUpRight,
	IconChartBar,
	IconChartLine,
} from '@tabler/icons-react';

import { getStockChangeColor } from '@/entities/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import cls from '../stocks-page.module.css';

type StocksMarketSummaryProps = {
	totalCount: number;
	gainersCount: number;
	losersCount: number;
	averageChange: number;
};

export function StocksMarketSummary({
	totalCount,
	gainersCount,
	losersCount,
	averageChange,
}: StocksMarketSummaryProps) {
	return (
		<SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing={CONTENT_GRID_SPACING}>
			<SummaryCard
				icon={<IconChartBar size={20} />}
				label='Инструменты'
				value={String(totalCount)}
			/>
			<SummaryCard
				icon={<IconArrowUpRight size={20} />}
				label='Растут сегодня'
				value={String(gainersCount)}
				color='green'
			/>
			<SummaryCard
				icon={<IconArrowDownRight size={20} />}
				label='Снижаются'
				value={String(losersCount)}
				color='red'
			/>
			<SummaryCard
				icon={<IconChartLine size={20} />}
				label='Среднее изменение'
				value={(
					<>
						{averageChange > 0 ? '+' : ''}
						<NumberFormatter
							value={averageChange}
							decimalScale={2}
							fixedDecimalScale
							suffix='%'
						/>
					</>
				)}
				color={getStockChangeColor(averageChange)}
			/>
		</SimpleGrid>
	);
}

function SummaryCard({
	icon,
	label,
	value,
	color = 'gray',
}: {
	icon: ReactNode;
	label: string;
	value: ReactNode;
	color?: string;
}) {
	return (
		<Card withBorder bg='transparent' padding='md' className={cls.summaryCard}>
			<Flex justify='space-between' gap='md' align='flex-start'>
				<Stack gap={2}>
					<Text size='sm' c='dimmed'>
						{label}
					</Text>

					<Text fw={700} size='xl' c={color}>
						{value}
					</Text>
				</Stack>

				<div className={cls.summaryIcon} data-color={color}>
					{icon}
				</div>
			</Flex>
		</Card>
	);
}
