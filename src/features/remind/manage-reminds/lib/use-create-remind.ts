import { useCreateUserRemind } from '@/entities/remind';

import { getCurrentReminderDateTime } from './remind-date-time';

const DEFAULT_REMINDER_TEXT = 'Новое напоминание';

export function useCreateRemind() {
	const createReminderMutation = useCreateUserRemind();

	const createRemind = (tradeCodeId: number, onSuccess?: () => void) => {
		createReminderMutation.mutate(
			{
				tradeCodeId,
				data: {
					text: DEFAULT_REMINDER_TEXT,
					dateTime: getCurrentReminderDateTime(),
				},
			},
			{ onSuccess },
		);
	};

	return {
		createRemind,
		isPending: createReminderMutation.isPending,
	};
}
