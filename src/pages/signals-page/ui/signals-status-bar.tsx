import {
	Badge,
	Group,
	Skeleton,
	Text,
	Tooltip,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useMemo } from 'react';

import {
	mapStrategyResultResponseToSignals,
	useGetResultSuspense,
} from '@/entities/signal';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import type { SignalFilters } from '../model/signal-filters';

import { getSignalResultsMock } from '../api/signal-results.mock';
import { getFilteredSignals } from '../model/signal-filters';

type SignalsStatusBarProps = {
	filters: SignalFilters;
};

export function SignalsStatusBar({ filters }: SignalsStatusBarProps) {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
			queryFn: getSignalResultsMock,
			staleTime: Infinity,
			refetchInterval: 60000,
		},
	});
	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);
	const filteredAndSortedSignals = useMemo(() => {
		return getFilteredSignals(signals, filters);
	}, [signals, filters]);

	const totalCount = signals.length;
	const filteredCount = filteredAndSortedSignals.length;
	const isFiltered = totalCount !== filteredCount;
	const buyCount = filteredAndSortedSignals.filter((s) => s.direction === 'buy').length;
	const sellCount = filteredAndSortedSignals.filter((s) => s.direction === 'sell').length;

	return (
		<Group justify='space-between' align='center'>
			<Group gap='md'>
				<Text size='sm' c='dimmed'>
					Показано:
					{' '}
					<Text span fw={500} c='var(--mantine-color-text)'>
						{filteredCount}
					</Text>
					{isFiltered && ` из ${totalCount}`}
				</Text>

				<Tooltip label='Данные обновляются автоматически каждую минуту'>
					<Badge
						variant='default'
						size='sm'
						leftSection={<IconRefresh size={12} />}
						style={{ textTransform: 'none' }}
					>
						Автообновление: 1 мин
					</Badge>
				</Tooltip>
			</Group>

			{filteredCount > 0 && (
				<Group gap='sm'>
					<ValueBadge variant='dot' color='green' size='sm' label='Покупать' value={buyCount} />
					<ValueBadge variant='dot' color='red' size='sm' label='Продавать' value={sellCount} />
				</Group>
			)}
		</Group>
	);
}

export const SignalsStatusBarBoundary = withQueryBoundary(SignalsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} radius='md' />,
	},
});
