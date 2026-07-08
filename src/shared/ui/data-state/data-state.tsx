import type { ReactNode } from 'react';

import { NoDataState, NoResultsState } from '../app-empty-state';

type DataStateProps = {
	hasData: boolean;
	hasResults?: boolean;
	noDataState?: ReactNode;
	noResultsState?: ReactNode;
	children: ReactNode;
};

export function DataState({
	hasData,
	hasResults,
	noDataState,
	noResultsState,
	children,
}: DataStateProps) {
	if (!hasData) {
		return noDataState ?? <NoDataState />;
	}

	if (hasResults === false) {
		return noResultsState ?? <NoResultsState />;
	}

	return children;
}
