import { Box, Checkbox, Tooltip } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';

import { invalidateGetStrategiesByInstrument } from '@/entities/instrument';
import { useToggleUserStrategy } from '@/entities/strategy';

type StrategyToggleCheckboxProps = {
	strategyId: number;
	isActive: boolean;
	instrumentId?: number;
};

export function StrategyToggleCheckbox({ strategyId, isActive, instrumentId }: StrategyToggleCheckboxProps) {
	const queryClient = useQueryClient();
	const strategyToggle = useToggleUserStrategy();
	const onStrategyToggleSuccess = () => {
		if (instrumentId !== undefined)
			void invalidateGetStrategiesByInstrument(queryClient, instrumentId);
	};
	const isPending = strategyToggle.isPending && strategyToggle.variables?.strategyId === strategyId;

	const activeActionLabel = isActive ? 'Выключить сигналы' : 'Включить сигналы';

	return (
		<Box style={{ position: 'relative', zIndex: 2 }}>
			<Tooltip label={activeActionLabel}>
				<Checkbox
					checked={isActive}
					onChange={(event) => {
						strategyToggle.mutate({
							strategyId,
							isActive: event.currentTarget.checked,
						}, onStrategyToggleSuccess);
					}}
					size='md'
					disabled={isPending}
					aria-label={activeActionLabel}
				/>
			</Tooltip>
		</Box>
	);
}
