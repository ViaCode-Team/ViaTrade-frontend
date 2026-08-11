import type { StrategyResponse } from '@/shared/api';

export type StrategyCardStrategy = {
	id: number;
	name: string;
	displayName: string;
	description?: string;
	accuracy?: number;
	signalFrequency?: string;
	investmentHorizon?: string;
	isSubscribed: boolean;
};

export type Strategy = StrategyCardStrategy & {
	logicDescription?: string;
	useDescription?: string;
	limitDescription?: string;
};

export function mapStrategyResponseToStrategy(strategy: StrategyResponse): Strategy {
	return {
		id: strategy.id,
		name: strategy.name,
		displayName: strategy.displayName,
		description: normalizeOptionalText(strategy.description),
		accuracy: normalizeAccuracy(strategy.accuracy),
		signalFrequency: normalizeOptionalText(strategy.signalFrequency),
		investmentHorizon: normalizeOptionalText(strategy.investmentHorizon),
		logicDescription: normalizeOptionalText(strategy.logicDescription),
		useDescription: normalizeOptionalText(strategy.usageDescription),
		limitDescription: normalizeOptionalText(strategy.limitationsDescription),
		isSubscribed: strategy.isSubscribed,
	};
}

export function mapStrategyToStrategyCard(
	strategy: Omit<StrategyCardStrategy, 'isSubscribed'>,
	isSubscribed: boolean,
): StrategyCardStrategy {
	return {
		id: strategy.id,
		name: strategy.name,
		displayName: strategy.displayName,
		description: strategy.description,
		accuracy: strategy.accuracy,
		signalFrequency: strategy.signalFrequency,
		investmentHorizon: strategy.investmentHorizon,
		isSubscribed,
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
