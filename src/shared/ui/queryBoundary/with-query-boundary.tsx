import type { ComponentType, FC } from 'react';

import { QueryBoundary, type QueryBoundaryProps } from './query-boundary';

type WithQueryBoundaryOptions = Omit<QueryBoundaryProps, 'children'>;

export function withQueryBoundary<P extends object>(
	Component: ComponentType<P>,
	options?: WithQueryBoundaryOptions,
): FC<P> {
	function ComponentWithQueryBoundary(props: P) {
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
