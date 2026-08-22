import type { Strategy } from '@/entities/strategy';

import type { StrategyStatusFilter } from './filters';

export function filterStrategiesBySubscription(
	strategies: Strategy[],
	statusFilter: StrategyStatusFilter = 'all',
) {
	return strategies.filter((strategy) => {
		const matchesStatus = statusFilter === 'all' || (statusFilter === 'subscribed' && strategy.isSubscribed)
			|| (statusFilter === 'unsubscribed' && !strategy.isSubscribed);

		return matchesStatus;
	});
}
