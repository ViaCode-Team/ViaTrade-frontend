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

import type { SignalFilters } from '../model/signal-filters';

import { getSignalResultsMock } from '../api/signal-results.mock';
import { getFilteredSignals } from '../model/signal-filters';

type SignalsStatusBarProps = {
	filters: SignalFilters;
};

/**
 * Важные мысли для прототипирования:
 * 1. Индикатор свежести данных: В торговле критично знать, когда данные были обновлены. Поэтому добавлена бейджа "Автообновление". В будущем здесь можно сделать переключатель (вкл/выкл) и показывать таймер обратного отсчета до следующего запроса.
 * 2. Индикатор соединения: Зеленая точка дает уверенность, что веб-сокет или поллинг активен и соединение не разорвано. В случае ошибки можно менять цвет на красный и писать "Переподключение...".
 * 3. Контекст фильтрации: Важно показывать не только сколько найдено, но и сколько всего элементов в базе (`Показано X из Y`), чтобы пользователь понимал, что фильтры активны.
 * 4. Этот компонент легко выносится в shared/ui или widgets для переиспользования на других страницах.
 */
export function SignalsStatusBar({ filters }: SignalsStatusBarProps) {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
			queryFn: getSignalResultsMock,
			staleTime: Infinity,
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
					<Badge variant='dot' color='green' size='sm'>
						Покупать:
						{' '}
						{buyCount}
					</Badge>
					<Badge variant='dot' color='red' size='sm'>
						Продавать:
						{' '}
						{sellCount}
					</Badge>
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
