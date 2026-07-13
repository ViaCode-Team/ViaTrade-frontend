import type { ReactNode } from 'react';

import { NoDataState, NoResultsState } from '../app-empty-state';

export type DataStateProps = {
	hasData?: boolean;
	hasResults?: boolean;
	noDataFallback?: ReactNode;
	noResultsFallback?: ReactNode;
	children: ReactNode;
};

export function DataState({
	hasData,
	hasResults,
	noDataFallback,
	noResultsFallback,
	children,
}: DataStateProps) {
	if (hasData === false) {
		return noDataFallback === undefined ? <NoDataState /> : noDataFallback;
	}

	if (hasResults === false) {
		return noResultsFallback === undefined ? <NoResultsState /> : noResultsFallback;
	}

	return children;
}
