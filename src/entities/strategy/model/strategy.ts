import type {
	TradeStrategy,
	UserTradeStrategyDto,
} from '@/shared/api';

export type StrategyCardStrategy = {
	id: number;
	name: string;
	description?: string;
	accuracy?: number;
	signalFrequency?: string;
	investmentHorizon?: string;
	isActive: boolean;
};

export type Strategy = StrategyCardStrategy & {
	logicDescription?: string;
	useDescription?: string;
	limitDescription?: string;
};

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
): Strategy {
	return {
		id: tradeStrategy.id,
		name: tradeStrategy.name,
		description: normalizeOptionalText(tradeStrategy.description),
		accuracy: normalizeAccuracy(tradeStrategy.accuracy),
		signalFrequency: normalizeOptionalText(tradeStrategy.signalFrequency),
		investmentHorizon: normalizeOptionalText(tradeStrategy.investmentHorizon),
		logicDescription: normalizeOptionalText(tradeStrategy.logicDesc),
		useDescription: normalizeOptionalText(tradeStrategy.useDesc),
		limitDescription: normalizeOptionalText(tradeStrategy.limitDesc),
		isActive: activeStrategyIds.has(tradeStrategy.id),
	};
}

export function mapTradeStrategiesToStrategies(
	tradeStrategies: TradeStrategy[],
	userStrategies: UserTradeStrategyDto[],
) {
	const activeStrategyIds = getUserStrategyIdSet(userStrategies);

	return tradeStrategies.map((tradeStrategy) =>
		mapTradeStrategyToStrategy(tradeStrategy, activeStrategyIds),
	);
}

export function mapStrategyToStrategyCard(
	strategy: Omit<StrategyCardStrategy, 'isActive'>,
	isActive: boolean,
): StrategyCardStrategy {
	return {
		id: strategy.id,
		name: strategy.name,
		description: strategy.description,
		accuracy: strategy.accuracy,
		signalFrequency: strategy.signalFrequency,
		investmentHorizon: strategy.investmentHorizon,
		isActive,
	};
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
		return undefined;
	}

	return Math.min(100, Math.max(0, Math.round(accuracy)));
}

function normalizeOptionalText(value: string | null | undefined) {
	if (!value?.trim()) {
		return undefined;
	}

	return value.trim();
}
