import type { ComponentProps, ComponentType, FC } from 'react';

import { QueryBoundary, type QueryBoundaryProps } from './query-boundary';

type WithQueryBoundaryOptions = Omit<QueryBoundaryProps, 'children'>;

export function withQueryBoundary<C extends ComponentType<any>>(
	Component: C,
	options?: WithQueryBoundaryOptions,
): FC<ComponentProps<C>> {
	function ComponentWithQueryBoundary(props: ComponentProps<C>) {
		return (
			<QueryBoundary {...options}>
				<Component {...(props as any)} />
			</QueryBoundary>
		);
	}

	ComponentWithQueryBoundary.displayName = `withQueryBoundary(${
		Component.displayName || Component.name || 'Component'
	})`;

	return ComponentWithQueryBoundary as FC<ComponentProps<C>>;
}
