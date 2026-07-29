import { useCreateReminder } from '@/entities/instrument';

import { getCurrentReminderDateTime } from './remind-date-time';

const DEFAULT_REMINDER_TEXT = 'Новое напоминание';

export function useCreateRemind() {
	const createReminderMutation = useCreateReminder();

	const createRemind = (instrumentId: number, onSuccess?: () => void) => {
		createReminderMutation.mutate(
			{
				instrumentId,
				data: {
					text: DEFAULT_REMINDER_TEXT,
					remindAt: getCurrentReminderDateTime(),
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
