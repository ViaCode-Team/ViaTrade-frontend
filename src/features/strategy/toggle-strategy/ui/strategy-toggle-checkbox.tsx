import { Box, Checkbox, Tooltip } from '@mantine/core';

import { useToggleUserStrategy } from '@/entities/strategy';

type StrategyToggleCheckboxProps = {
	strategyId: number;
	isActive: boolean;
};

export function StrategyToggleCheckbox({ strategyId, isActive }: StrategyToggleCheckboxProps) {
	const strategyToggle = useToggleUserStrategy();
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
						});
					}}
					size='md'
					disabled={isPending}
					aria-label={activeActionLabel}
				/>
			</Tooltip>
		</Box>
	);
}
