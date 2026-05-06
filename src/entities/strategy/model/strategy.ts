import type {
	TradeStrategy,
	UserTradeStrategyDto,
} from '@/shared/api';

export type Strategy = {
	id: number;
	name: string;
	description: string;
	accuracy: number;
	signalFrequency: string;
	investmentHorizon: string;
	logicDescription: string;
	useDescription: string;
	limitDescription: string;
	isActive: boolean;
};

export const mockStrategies: Strategy[] = [
	{
		id: 1,
		name: 'Momentum 1D',
		description: 'Ловит устойчивые импульсы после пробоя локальных уровней.',
		accuracy: 68,
		signalFrequency: '2-4 в неделю',
		investmentHorizon: '1-5 дней',
		logicDescription: 'Покупает актив после подтвержденного пробоя уровня.',
		useDescription: 'Подходит для ликвидных инструментов с выраженным импульсом.',
		limitDescription: 'Может давать ложные сигналы в боковом рынке.',
		isActive: true,
	},
	{
		id: 2,
		name: 'Mean Reversion Swing',
		description: 'Работает на возврат цены к средним значениям после перегрева.',
		accuracy: 74,
		signalFrequency: '1-2 в неделю',
		investmentHorizon: '1-3 недели',
		logicDescription: 'Ищет перегретые движения и ожидает возврат к среднему.',
		useDescription: 'Лучше раскрывается после резких отклонений цены.',
		limitDescription: 'Сильный тренд может продолжить движение против позиции.',
		isActive: true,
	},
	{
		id: 3,
		name: 'Breakout Volatility',
		description: 'Фокус на резких движениях при росте волатильности и объема.',
		accuracy: 59,
		signalFrequency: '3-6 в неделю',
		investmentHorizon: '1-2 часа - 2 дня',
		logicDescription: 'Отбирает сделки на росте волатильности и объема.',
		useDescription: 'Подходит для активных торговых сессий и новостных периодов.',
		limitDescription: 'Высокая волатильность увеличивает риск резких откатов.',
		isActive: true,
	},
	{
		id: 4,
		name: 'Dividend Value',
		description: 'Подбор недооцененных дивидендных бумаг для спокойного роста.',
		accuracy: 81,
		signalFrequency: '1-3 в месяц',
		investmentHorizon: '6-18 месяцев',
		logicDescription: 'Сравнивает дивидендную доходность и фундаментальную оценку.',
		useDescription: 'Подходит для долгосрочного портфельного отбора.',
		limitDescription: 'Не рассчитана на быстрые спекулятивные сделки.',
		isActive: true,
	},
	{
		id: 5,
		name: 'Trend Following Futures',
		description: 'Следует за среднесрочным трендом по подтвержденным сигналам.',
		accuracy: 65,
		signalFrequency: '4-8 в месяц',
		investmentHorizon: '2-8 недель',
		logicDescription: 'Удерживает позицию, пока тренд подтверждается сигналами.',
		useDescription: 'Подходит для рынков с устойчивым направленным движением.',
		limitDescription: 'Развороты тренда могут приводить к запаздывающим выходам.',
		isActive: false,
	},
	{
		id: 6,
		name: 'Event Driven News',
		description: 'Реакция на новостные триггеры с быстрым контролем позиции.',
		accuracy: 32,
		signalFrequency: 'по событию',
		investmentHorizon: '1-24 часа',
		logicDescription: 'Оценивает резкие движения после значимых новостей.',
		useDescription: 'Подходит для краткосрочной реакции на события.',
		limitDescription: 'Новостной шум может быстро менять направление цены.',
		isActive: true,
	},
];

const STRATEGY_EMPTY_FIELD = 'Не указано';
const STRATEGY_EMPTY_DESCRIPTION = 'Описание стратегии пока не заполнено.';

export function getUserStrategyIdSet(userStrategies: UserTradeStrategyDto[]) {
	return new Set(
		userStrategies
			.map((userStrategy) => userStrategy.tradeStrategyId)
			.filter((strategyId): strategyId is number => typeof strategyId === 'number'),
	);
}

export function mapTradeStrategyToStrategy(
	tradeStrategy: TradeStrategy,
	activeStrategyIds: Set<number>,
): Strategy | null {
	if (typeof tradeStrategy.id !== 'number') {
		return null;
	}

	return {
		id: tradeStrategy.id,
		name: tradeStrategy.name,
		description: tradeStrategy.description || STRATEGY_EMPTY_DESCRIPTION,
		accuracy: normalizeAccuracy(tradeStrategy.accuracy),
		signalFrequency: tradeStrategy.signalFrequency || STRATEGY_EMPTY_FIELD,
		investmentHorizon: tradeStrategy.investmentHorizon || STRATEGY_EMPTY_FIELD,
		logicDescription: tradeStrategy.logicDesc || STRATEGY_EMPTY_FIELD,
		useDescription: tradeStrategy.useDesc || STRATEGY_EMPTY_FIELD,
		limitDescription: tradeStrategy.limitDesc || STRATEGY_EMPTY_FIELD,
		isActive: activeStrategyIds.has(tradeStrategy.id),
	};
}

export function mapTradeStrategiesToStrategies(
	tradeStrategies: TradeStrategy[],
	userStrategies: UserTradeStrategyDto[],
) {
	const activeStrategyIds = getUserStrategyIdSet(userStrategies);

	return tradeStrategies.reduce<Strategy[]>((strategies, tradeStrategy) => {
		const strategy = mapTradeStrategyToStrategy(tradeStrategy, activeStrategyIds);

		if (strategy) {
			strategies.push(strategy);
		}

		return strategies;
	}, []);
}

export function getAccuracyColor(accuracy: number) {
	if (accuracy >= 70) {
		return 'green';
	}

	if (accuracy >= 50) {
		return 'yellow';
	}

	return 'red';
}

function normalizeAccuracy(accuracy: number | null | undefined) {
	if (typeof accuracy !== 'number' || Number.isNaN(accuracy)) {
		return 0;
	}

	return Math.min(100, Math.max(0, Math.round(accuracy)));
}
