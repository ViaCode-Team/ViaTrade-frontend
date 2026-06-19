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
	isActiveChangePending?: boolean;
	onActiveChange: (isActive: boolean) => void;
};

export function StrategyTitleBlock({
	strategy,
	isActiveChangePending = false,
	onActiveChange,
}: StrategyTitleBlockProps) {
	const activeActionLabel = strategy.isActive
		? 'Выключить сигналы'
		: 'Включить сигналы';

	return (
		<Stack gap='xs' data-active={strategy.isActive} className={cls.titleBlock}>
			<Title order={1} style={{ overflowWrap: 'anywhere' }}>
				{strategy.name}
			</Title>

			<Stack>
				<Text style={{ overflowWrap: 'anywhere' }}>
					{strategy.description}
				</Text>

				<Tooltip label={activeActionLabel}>
					<Checkbox
						checked={strategy.isActive}
						onChange={(event) => {
							onActiveChange(event.currentTarget.checked);
						}}
						size='md'
						disabled={isActiveChangePending}
						label={strategy.isActive ? 'Сигналы включены' : 'Сигналы отключены'}
						aria-label={`${activeActionLabel} ${strategy.name}`}
					/>
				</Tooltip>
			</Stack>

		</Stack>
	);
}
