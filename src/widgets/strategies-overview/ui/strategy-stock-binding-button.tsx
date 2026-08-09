import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Strategy } from '@/entities/strategy';

import { StrategyStockBindingModalBoundary } from './strategy-stock-binding-modal';

type StrategyStockBindingButtonProps = {
	strategy: Strategy;
};

function openStrategyStockBindingModal(strategy: Strategy) {
	modals.open({
		title: `Акции стратегии «${strategy.name}»`,
		size: 'xl',
		children: <StrategyStockBindingModalBoundary strategyId={strategy.id} />,
	});
}

export function StrategyStockBindingButton({ strategy }: StrategyStockBindingButtonProps) {
	return (
		<Button mt='auto' variant='default' style={{ position: 'relative', zIndex: 2 }} onClick={() => openStrategyStockBindingModal(strategy)}>
			Связать акции
		</Button>
	);
}
