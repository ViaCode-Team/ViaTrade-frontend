import type { ReactNode } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';

import { HELP_TOOLTIP_OPEN_DELAY } from '@/shared/model';

export type HelpTooltipProps = {
	text: ReactNode;
	w?: number;
	size?: number;
	iconSize?: number;
	ariaLabel?: string;
};

export function HelpTooltip({
	text,
	w = 280,
	size = 18,
	iconSize = 16,
	ariaLabel = 'Справка',
}: HelpTooltipProps) {
	return (
		<Tooltip
			label={text}
			multiline
			w={w}
			withArrow
			openDelay={HELP_TOOLTIP_OPEN_DELAY}
			events={{ hover: true, focus: true, touch: true }}
		>
			<ActionIcon
				size={size}
				aria-label={ariaLabel}
				variant='transparent'
				c='dimmed'
			>
				<IconHelpCircle size={iconSize} />
			</ActionIcon>
		</Tooltip>
	);
}
