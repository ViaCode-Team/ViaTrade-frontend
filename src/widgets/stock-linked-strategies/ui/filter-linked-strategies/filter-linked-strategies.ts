import type { Strategy } from '@/entities/strategy';

import type { LinkedStrategyFilters } from './linked-strategy-filters';

export function filterLinkedStrategies(strategies: Strategy[], filters: LinkedStrategyFilters): Strategy[] {
	return strategies
		.filter((strategy) => {
			const matchesQuery = strategy.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
				|| (strategy.description?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ?? false);

			const matchesStatus = filters.statusFilter === 'all'
				|| (filters.statusFilter === 'subscribed' && strategy.isSubscribed)
				|| (filters.statusFilter === 'unsubscribed' && !strategy.isSubscribed);

			return matchesQuery && matchesStatus;
		})
		.sort((a, b) => {
			if (filters.sortOption === 'name-asc') {
				return a.name.localeCompare(b.name);
			}

			if (filters.sortOption === 'name-desc') {
				return b.name.localeCompare(a.name);
			}

			if (filters.sortOption === 'accuracy-desc') {
				return (b.accuracy ?? 0) - (a.accuracy ?? 0);
			}

			if (filters.sortOption === 'accuracy-asc') {
				return (a.accuracy ?? 0) - (b.accuracy ?? 0);
			}

			return 0;
		});
}
