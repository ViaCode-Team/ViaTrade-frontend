import { Stack } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import type { Strategy } from '@/entities/strategy';

import { mockStrategies } from '@/entities/strategy';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyInfoGrid } from './ui/strategy-info-grid';
import { StrategyNotFound } from './ui/strategy-not-found';

export function StrategyPage() {
	const { strategyName } = useParams();

	const strategyFromRoute = useMemo(
		() => mockStrategies.find((strategy) => strategy.id === strategyName),
		[strategyName],
	);

	const [activeOverrides, setActiveOverrides] = useState<Record<string, boolean>>({});

	if (!strategyFromRoute) {
		return <StrategyNotFound />;
	}

	const strategy: Strategy = {
		...strategyFromRoute,
		isActive: activeOverrides[strategyFromRoute.id] ?? strategyFromRoute.isActive,
	};

	const handleActiveChange = (nextIsActive: boolean) => {
		setActiveOverrides((currentOverrides) => ({
			...currentOverrides,
			[strategy.id]: nextIsActive,
		}));
	};

	return (
		<>
			<Stack>
				<BackToStrategiesLink />

				<StrategyHero strategy={strategy} onActiveChange={handleActiveChange} />
			</Stack>

			<StrategyInfoGrid />
		</>
	);
}
