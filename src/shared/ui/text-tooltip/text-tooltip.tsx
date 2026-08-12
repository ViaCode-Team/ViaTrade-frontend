import type { TextProps } from '@mantine/core';
import type { ReactNode } from 'react';

import { Text, Tooltip } from '@mantine/core';

import { HELP_TOOLTIP_OPEN_DELAY } from '@/shared/model';

export type TextTooltipProps = TextProps & {
	label: ReactNode;
	children: ReactNode;
	w?: number;
};

export function TextTooltip({
	label,
	children,
	w = 280,
	style,
	...textProps
}: TextTooltipProps) {
	return (
		<Tooltip
			label={label}
			multiline
			w={w}
			withArrow
			openDelay={HELP_TOOLTIP_OPEN_DELAY}
			events={{ hover: true, focus: true, touch: true }}
		>
			<Text
				span
				{...textProps}
				style={{
					borderBottom: '1px dashed currentColor',
					cursor: 'help',
					...style,
				}}
			>
				{children}
			</Text>
		</Tooltip>
	);
}
