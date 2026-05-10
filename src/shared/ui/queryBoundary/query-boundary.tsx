import { QueryErrorResetBoundary } from '@tanstack/react-query';
import {
	type ComponentProps,
	type ComponentType,
	type ReactNode,
	Suspense,
} from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { ErrorFallback } from '../errorFallback';

type QueryErrorResetBoundaryProps = ComponentProps<
	typeof QueryErrorResetBoundary
>;

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

type SuspenseProps = ComponentProps<typeof Suspense>;

type ErrorFallbackProps
	= | {
		fallback: ReactNode;
		fallbackRender?: never;
		FallbackComponent?: never;
	}
	| {
		fallback?: never;
		fallbackRender: (props: FallbackProps) => ReactNode;
		FallbackComponent?: never;
	}
	| {
		fallback?: never;
		fallbackRender?: never;
		FallbackComponent: ComponentType<FallbackProps>;
	};

export type QueryBoundaryProps = {
	children: ReactNode;
	queryErrorResetBoundaryProps?: Omit<
		QueryErrorResetBoundaryProps,
		'children'
	>;
	errorBoundaryProps?: Omit<
		ErrorBoundaryProps,
		'children' | 'fallback' | 'fallbackRender' | 'FallbackComponent'
	>;
	errorFallbackProps?: ErrorFallbackProps;
	suspenseProps?: Omit<SuspenseProps, 'children'>;
};

export function QueryBoundary({
	children,
	queryErrorResetBoundaryProps,
	errorBoundaryProps,
	errorFallbackProps,
	suspenseProps,
}: QueryBoundaryProps) {
	const { onReset, ...restErrorBoundaryProps } = errorBoundaryProps ?? {};

	const fallbackProps = errorFallbackProps ?? {
		FallbackComponent: ErrorFallback,
	};

	return (
		<QueryErrorResetBoundary {...queryErrorResetBoundaryProps}>
			{({ reset }) => (
				<ErrorBoundary
					{...restErrorBoundaryProps}
					{...fallbackProps}
					onReset={(details) => {
						reset();
						onReset?.(details);
					}}
				>
					<Suspense {...suspenseProps}>
						{children}
					</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
