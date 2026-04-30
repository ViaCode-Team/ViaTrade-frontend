import { ActionIcon, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconHelpCircle } from '@tabler/icons-react';

import cls from '../strategy-page.module.css';

const ACCURACY_HELP_TEXT
	= 'Историческая доля сигналов, которые отработали по правилам стратегии. Показатель не гарантирует будущий результат.';

export function AccuracyHelp() {
	const [opened, { toggle }] = useDisclosure(false);
	const isHoverDevice = useMediaQuery('(hover: hover) and (pointer: fine)', true);

	const button = (
		<ActionIcon
			type='button'
			variant='transparent'
			size={20}
			radius='xl'
			color='dimmed'
			aria-label='Что означает точность стратегии'
			className={cls.helpButton}
			onClick={isHoverDevice ? undefined : toggle}
		>
			<IconHelpCircle size={18} color='var(--mantine-color-dimmed)' stroke={2} />
		</ActionIcon>
	);

	if (isHoverDevice) {
		return (
			<Tooltip
				label={ACCURACY_HELP_TEXT}
				multiline
				w={280}
				withArrow
				openDelay={150}
			>
				{button}
			</Tooltip>
		);
	}

	return (
		<Tooltip
			opened={opened}
			label={ACCURACY_HELP_TEXT}
			multiline
			w={280}
			withArrow
			openDelay={150}
			onClick={toggle}
		>
			{button}
		</Tooltip>
	);
}
