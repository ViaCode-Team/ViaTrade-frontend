import { NumberFormatter } from '@mantine/core';

import { getStockChangeColor } from '@/entities/stock';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type StocksMarketSummaryProps = {
	totalCount: number;
	gainersCount: number;
	losersCount: number;
	averageChange: number;
	isLoading?: boolean;
};

export function StocksMarketSummary({
	totalCount,
	gainersCount,
	losersCount,
	averageChange,
	isLoading,
}: StocksMarketSummaryProps) {
	return (
		<SummaryList>
			<SummaryCard
				title='Инструменты'
				value={totalCount}
				isLoading={isLoading}
			/>
			<SummaryCard
				title='Растут сегодня'
				value={gainersCount}
				color='green'
				isLoading={isLoading}
			/>
			<SummaryCard
				title='Снижаются'
				value={losersCount}
				color='red'
				isLoading={isLoading}
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
				isLoading={isLoading}
			/>
		</SummaryList>
	);
}
