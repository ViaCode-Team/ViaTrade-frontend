import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';

const ACCURACY_HELP_TEXT
	= 'Историческая доля сигналов, которые отработали по правилам стратегии. Показатель не гарантирует будущий результат';

export function AccuracyHelp() {
	return (
		<Tooltip
			label={ACCURACY_HELP_TEXT}
			multiline
			w={280}
			withArrow
			openDelay={150}
			events={{ hover: true, focus: true, touch: true }}
		>
			<ActionIcon
				size={20}
				aria-label='Что означает точность стратегии'
				variant='transparent'
				c='dimmed'
			>
				<IconHelpCircle size={18} stroke={2} />
			</ActionIcon>
		</Tooltip>
	);
}
