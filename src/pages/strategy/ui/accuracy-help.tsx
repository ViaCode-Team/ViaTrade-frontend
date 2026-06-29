import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';

import { HELP_TOOLTIP_OPEN_DELAY } from '@/shared/model';

const ACCURACY_HELP_TEXT
	= 'Историческая доля сигналов, которые отработали по правилам стратегии. Показатель не гарантирует будущий результат';

export function AccuracyHelp() {
	return (
		<Tooltip
			label={ACCURACY_HELP_TEXT}
			multiline
			w={280}
			withArrow
			openDelay={HELP_TOOLTIP_OPEN_DELAY}
			events={{ hover: true, focus: true, touch: true }}
		>
			<ActionIcon
				size={20}
				aria-label='Что означает точность стратегии'
				variant='transparent'
				c='dimmed'
			>
				<IconHelpCircle size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
