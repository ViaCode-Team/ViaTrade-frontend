import type { ReactNode } from 'react';

import { NoDataState, NoResultsState } from '../app-empty-state';

export type DataStateProps = {
	hasData?: boolean;
	hasResults?: boolean;
	onResetFilters?: () => void;
	noDataFallback?: ReactNode;
	noResultsFallback?: ReactNode;
	children: ReactNode;
};

export function DataState({
	hasData,
	hasResults,
	onResetFilters,
	noDataFallback,
	noResultsFallback,
	children,
}: DataStateProps) {
	if (hasData === false) {
		if (noDataFallback !== undefined)
			return noDataFallback;

		return <NoDataState />;
	}

	if (hasResults === false) {
		if (noResultsFallback !== undefined)
			return noResultsFallback;

		if (onResetFilters)
			return <NoResultsState onReset={onResetFilters} />;

		return <NoResultsState />;
	}

	return children;
}
