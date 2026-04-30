import {
	Checkbox,
	Stack,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';

import type { Strategy } from '@/entities/strategy';

import cls from '../strategy-page.module.css';

type StrategyTitleBlockProps = {
	strategy: Strategy;
	onActiveChange: (isActive: boolean) => void;
};

export function StrategyTitleBlock({
	strategy,
	onActiveChange,
}: StrategyTitleBlockProps) {
	const activeActionLabel = strategy.isActive
		? 'Деактивировать стратегию'
		: 'Активировать стратегию';

	return (
		<Stack gap='xs' data-active={strategy.isActive} className={cls.titleBlock}>
			<Title order={1}>
				{strategy.name}
			</Title>

			<Text>
				{strategy.description}
			</Text>

			<Tooltip label={activeActionLabel}>
				<Checkbox
					checked={strategy.isActive}
					onChange={(event) => {
						onActiveChange(event.currentTarget.checked);
					}}
					size='md'
					label={strategy.isActive ? 'Сигналы включены' : 'Сигналы отключены'}
					aria-label={`${activeActionLabel} ${strategy.name}`}
					className={cls.activeControl}
				/>
			</Tooltip>
		</Stack>
	);
}
