import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import {
	EmptyState,
	type EmptyStateProps,
	type EmptyStateTitleProps,
} from '@mantine/core';

export type AppEmptyStateIndicatorProps = ComponentPropsWithoutRef<
	typeof EmptyState.Indicator
>;

export type AppEmptyStateTitleProps = ComponentPropsWithoutRef<
	typeof EmptyState.Title
>;

export type AppEmptyStateDescriptionProps = ComponentPropsWithoutRef<
	typeof EmptyState.Description
>;

export type AppEmptyStateActionsProps = ComponentPropsWithoutRef<
	typeof EmptyState.Actions
>;

export type AppEmptyStateProps = {
	icon?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	titleOrder?: EmptyStateTitleProps['order'];

	indicatorProps?: AppEmptyStateIndicatorProps;
	titleProps?: AppEmptyStateTitleProps;
	descriptionProps?: AppEmptyStateDescriptionProps;
	actionsProps?: AppEmptyStateActionsProps;
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
	size,
	align = 'center',
	indicatorProps,
	titleProps,
	descriptionProps,
	actionsProps,
	...props
}: AppEmptyStateProps) {
	return (
		<EmptyState size={size} align={align} {...props}>
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
