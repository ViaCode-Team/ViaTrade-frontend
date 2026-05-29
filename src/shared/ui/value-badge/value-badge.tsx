import type { ReactNode } from 'react';

import { Badge, type BadgeProps } from '@mantine/core';

export type ValueBadgeProps = {
	label: ReactNode;
	value: ReactNode;
} & BadgeProps;

export function ValueBadge({ label, value, ...props }: ValueBadgeProps) {
	return (
		<Badge {...props}>
			{label}
			{' '}
			{value}
		</Badge>
	);
}
