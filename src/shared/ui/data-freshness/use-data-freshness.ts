import { useInterval } from '@mantine/hooks';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { useAppNetwork } from '@/shared/lib/hooks';
import { milliseconds } from '@/shared/lib/milliseconds';

const COOLDOWN_DURATION = milliseconds.fromSeconds(10);
const TICK_INTERVAL = milliseconds.fromSeconds(1);

export type DataFreshnessState = {
	updatedAt: number;
	isFetching: boolean;
	isOnline: boolean;
	cooldownSecondsLeft: number;
	onRefresh: () => void;
};

function useCooldown(duration: number) {
	const [endsAt, setEndsAt] = useState(0);
	const [secondsLeft, setSecondsLeft] = useState(0);

	const interval = useInterval(() => {
		const remaining = Math.ceil((endsAt - Date.now()) / 1000);
		if (remaining <= 0) {
			setEndsAt(0);
			setSecondsLeft(0);
			interval.stop();
		}
		else {
			setSecondsLeft(remaining);
		}
	}, TICK_INTERVAL);

	useEffect(() => {
		if (endsAt > 0)
			interval.start();

		return interval.stop;
	}, [endsAt, interval]);

	const start = useCallback(() => {
		setEndsAt(Date.now() + duration);
		setSecondsLeft(Math.ceil(duration / 1000));
	}, [duration]);

	return { secondsLeft, start };
}

function useQueryCacheUpdatedAt() {
	const queryClient = useQueryClient();

	const [updatedAt, setUpdatedAt] = useState(() => {
		const queries = queryClient.getQueryCache().findAll({ type: 'active' });
		if (queries.length === 0)
			return 0;
		return Math.max(...queries.map((q) => q.state.dataUpdatedAt));
	});

	useEffect(() => {
		return queryClient.getQueryCache().subscribe((event) => {
			if (event.type === 'updated' && event.action.type === 'success') {
				if (event.query.isActive())
					setUpdatedAt(event.query.state.dataUpdatedAt);
			}
			else if (event.type === 'observerAdded') {
				setUpdatedAt((prev) => Math.max(prev, event.query.state.dataUpdatedAt));
			}
		});
	}, [queryClient]);

	return updatedAt;
}

export function useDataFreshness(): DataFreshnessState {
	const queryClient = useQueryClient();
	const isFetching = useIsFetching() > 0;
	const { isOnline } = useAppNetwork();

	const updatedAt = useQueryCacheUpdatedAt();
	const { secondsLeft: cooldownSecondsLeft, start: startCooldown } = useCooldown(COOLDOWN_DURATION);

	const onRefresh = useCallback(() => {
		if (cooldownSecondsLeft > 0 || !isOnline)
			return;
		queryClient.invalidateQueries({ type: 'active' });
		startCooldown();
	}, [queryClient, cooldownSecondsLeft, isOnline, startCooldown]);

	return {
		updatedAt,
		isFetching,
		isOnline,
		cooldownSecondsLeft,
		onRefresh,
	};
}
