import type { ReactNode } from 'react';

import {
	EmptyState,
	type EmptyStateActionsProps,
	type EmptyStateDescriptionProps,
	type EmptyStateIndicatorProps,
	type EmptyStateProps,
	type EmptyStateTitleProps,
} from '@mantine/core';

import type { WithoutChildren } from '@/shared/lib/types';

export type AppEmptyStateProps = {
	icon?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	titleOrder?: EmptyStateTitleProps['order'];

	indicatorProps?: WithoutChildren<EmptyStateIndicatorProps>;
	titleProps?: WithoutChildren<EmptyStateTitleProps>;
	descriptionProps?: WithoutChildren<EmptyStateDescriptionProps>;
	actionsProps?: WithoutChildren<EmptyStateActionsProps>;
} & Omit<
	EmptyStateProps,
	'children' | 'icon' | 'title' | 'description'
>;

export function AppEmptyState({
	icon,
	title = 'Данные отсутствуют',
	description,
	actions,
	titleOrder = 4,
	align = 'center',
	indicatorProps,
	titleProps,
	descriptionProps,
	actionsProps,
	...props
}: AppEmptyStateProps) {
	return (
		<EmptyState align={align} {...props}>
			{icon && (
				<EmptyState.Indicator {...indicatorProps}>
					{icon}
				</EmptyState.Indicator>
			)}

			{title && (
				<EmptyState.Title order={titleOrder} {...titleProps}>
					{title}
				</EmptyState.Title>
			)}

			{description && (
				<EmptyState.Description {...descriptionProps}>
					{description}
				</EmptyState.Description>
			)}

			{actions && (
				<EmptyState.Actions {...actionsProps}>
					{actions}
				</EmptyState.Actions>
			)}
		</EmptyState>
	);
}
