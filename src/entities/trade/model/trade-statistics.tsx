import { InfoLabel } from '@/shared/ui/info-label';

export const TRADE_STATISTICS_CARDS = {
	totalTrades: {
		title: 'Всего сделок',
	},
	totalIncome: {
		title: 'Общая прибыль',
		getColor: (value: number) => value >= 0 ? 'green' : 'red',
	},
	winRate: {
		title: (
			<InfoLabel
				label='Win Rate'
				tooltipProps={{ text: 'Процент прибыльных сделок по отношению к общему числу закрытых сделок.' }}
			/>
		),
		getColor: (value: number) => value >= 50 ? 'green' : 'red',
	},
} as const;
