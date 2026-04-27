export type Strategy = {
	id: string;
	name: string;
	description: string;
	accuracy: number;
	signalFrequency: string;
	investmentHorizon: string;
	isActive: boolean;
};

export const mockStrategies: Strategy[] = [
	{
		id: 'momentum-1d',
		name: 'Momentum 1D',
		description: 'Ловит устойчивые импульсы после пробоя локальных уровней.',
		accuracy: 68,
		signalFrequency: '2-4 в неделю',
		investmentHorizon: '1-5 дней',
		isActive: true,
	},
	{
		id: 'mean-reversion-swing',
		name: 'Mean Reversion Swing',
		description: 'Работает на возврат цены к средним значениям после перегрева.',
		accuracy: 74,
		signalFrequency: '1-2 в неделю',
		investmentHorizon: '1-3 недели',
		isActive: true,
	},
	{
		id: 'breakout-volatility',
		name: 'Breakout Volatility',
		description: 'Фокус на резких движениях при росте волатильности и объема.',
		accuracy: 59,
		signalFrequency: '3-6 в неделю',
		investmentHorizon: '1-2 часа - 2 дня',
		isActive: true,
	},
	{
		id: 'dividend-value',
		name: 'Dividend Value',
		description: 'Подбор недооцененных дивидендных бумаг для спокойного роста.',
		accuracy: 81,
		signalFrequency: '1-3 в месяц',
		investmentHorizon: '6-18 месяцев',
		isActive: true,
	},
	{
		id: 'trend-following-futures',
		name: 'Trend Following Futures',
		description: 'Следует за среднесрочным трендом по подтвержденным сигналам.',
		accuracy: 65,
		signalFrequency: '4-8 в месяц',
		investmentHorizon: '2-8 недель',
		isActive: false,
	},
	{
		id: 'event-driven-news',
		name: 'Event Driven News',
		description: 'Реакция на новостные триггеры с быстрым контролем позиции.',
		accuracy: 32,
		signalFrequency: 'по событию',
		investmentHorizon: '1-24 часа',
		isActive: true,
	},
];

export function getAccuracyColor(accuracy: number) {
	if (accuracy >= 70) {
		return 'green';
	}

	if (accuracy >= 50) {
		return 'yellow';
	}

	return 'red';
}
