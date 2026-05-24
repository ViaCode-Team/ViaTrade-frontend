import { NumberFormatter } from '@mantine/core';

import { getStockChangeColor } from '@/entities/stock';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

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
		<SummaryList>
			<SummaryCard
				title='Инструменты'
				value={totalCount}
			/>
			<SummaryCard
				title='Растут сегодня'
				value={gainersCount}
				color='green'
			/>
			<SummaryCard
				title='Снижаются'
				value={losersCount}
				color='red'
			/>
			<SummaryCard
				title='Среднее изменение'
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
		</SummaryList>
	);
}
