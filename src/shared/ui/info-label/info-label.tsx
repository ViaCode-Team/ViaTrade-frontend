import type { ReactNode } from 'react';

import { Group } from '@mantine/core';

import type { HelpTooltipProps } from '../help-tooltip';

import { HelpTooltip } from '../help-tooltip';

export type InfoLabelProps = {
	label: ReactNode;
	tooltipProps: Omit<HelpTooltipProps, 'ariaLabel'> & { ariaLabel?: string };
	gap?: number | string;
};

export function InfoLabel({ label, tooltipProps, gap = 4 }: InfoLabelProps) {
	return (
		<Group gap={gap} wrap='nowrap'>
			{label}
			<HelpTooltip {...tooltipProps} />
		</Group>
	);
}
