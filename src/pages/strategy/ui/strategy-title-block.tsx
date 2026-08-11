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
	isSubscriptionChangePending?: boolean;
	onSubscriptionChange: (isSubscribed: boolean) => void;
};

export function StrategyTitleBlock({
	strategy,
	isSubscriptionChangePending = false,
	onSubscriptionChange,
}: StrategyTitleBlockProps) {
	const subscriptionActionLabel = strategy.isSubscribed
		? 'Отключить подписку на сигналы'
		: 'Подписаться на сигналы';

	return (
		<Stack gap='xs' data-subscribed={strategy.isSubscribed} className={cls.titleBlock}>
			<Title order={1} style={{ overflowWrap: 'anywhere' }}>
				{strategy.displayName}
			</Title>

			<Stack>
				<Text style={{ overflowWrap: 'anywhere' }}>
					{strategy.description}
				</Text>

				<Tooltip label={subscriptionActionLabel}>
					<Checkbox
						checked={strategy.isSubscribed}
						onChange={(event) => {
							onSubscriptionChange(event.currentTarget.checked);
						}}
						size='md'
						disabled={isSubscriptionChangePending}
						label={strategy.isSubscribed ? 'Подписка на сигналы активна' : 'Подписка на сигналы отключена'}
						aria-label={`${subscriptionActionLabel}: ${strategy.displayName}`}
					/>
				</Tooltip>
			</Stack>

		</Stack>
	);
}
