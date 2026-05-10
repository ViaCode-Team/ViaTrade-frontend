import type { ComponentType } from 'react';

import { QueryBoundary, type QueryBoundaryProps } from './query-boundary';

type WithQueryBoundaryOptions = Omit<QueryBoundaryProps, 'children'>;

export function withQueryBoundary<Props extends object>(
	Component: ComponentType<Props>,
	options?: WithQueryBoundaryOptions,
) {
	function ComponentWithQueryBoundary(props: Props) {
		return (
			<QueryBoundary {...options}>
				<Component {...props} />
			</QueryBoundary>
		);
	}

	ComponentWithQueryBoundary.displayName = `withQueryBoundary(${
		Component.displayName || Component.name || 'Component'
	})`;

	return ComponentWithQueryBoundary;
}
