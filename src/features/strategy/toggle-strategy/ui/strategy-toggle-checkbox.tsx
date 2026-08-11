import { Box, Checkbox, Tooltip } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';

import { invalidateGetStrategiesByInstrument } from '@/entities/instrument';
import { useToggleUserStrategy } from '@/entities/strategy';

type StrategyToggleCheckboxProps = {
	strategyId: number;
	isSubscribed: boolean;
	instrumentId?: number;
};

export function StrategyToggleCheckbox({ strategyId, isSubscribed, instrumentId }: StrategyToggleCheckboxProps) {
	const queryClient = useQueryClient();
	const strategyToggle = useToggleUserStrategy();
	const onStrategyToggleSuccess = () => {
		if (instrumentId !== undefined)
			void invalidateGetStrategiesByInstrument(queryClient, instrumentId);
	};
	const isPending = strategyToggle.isPending && strategyToggle.variables?.strategyId === strategyId;

	const subscriptionActionLabel = isSubscribed ? 'Отключить подписку на сигналы' : 'Подписаться на сигналы';

	return (
		<Box style={{ position: 'relative', zIndex: 2 }}>
			<Tooltip label={subscriptionActionLabel}>
				<Checkbox
					checked={isSubscribed}
					onChange={(event) => {
						strategyToggle.mutate({
							strategyId,
							isSubscribed: event.currentTarget.checked,
						}, onStrategyToggleSuccess);
					}}
					size='md'
					disabled={isPending}
					aria-label={subscriptionActionLabel}
				/>
			</Tooltip>
		</Box>
	);
}
