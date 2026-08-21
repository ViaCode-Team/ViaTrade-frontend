import { useQueryClient } from '@tanstack/react-query';

import {
	invalidateGetInstrumentReminders,
} from '@/entities/instrument';
import {
	getReminderDateTimeFromLocalParts,
	useUpdateReminder,
} from '@/entities/reminder';

type RemindUpdate = {
	text: string;
	date: string;
	time: string;
};

export function useUpdateRemind(instrumentId?: number) {
	const queryClient = useQueryClient();
	const updateRemindMutation = useUpdateReminder();

	const updateRemind = (remindId: string, updates: RemindUpdate, onSuccess?: () => void) => {
		updateRemindMutation.mutate(
			{
				reminderId: Number(remindId),
				data: {
					text: updates.text,
					remindAt: getReminderDateTimeFromLocalParts(updates.date, updates.time),
				},
			},
			{
				onSuccess: () => {
					if (instrumentId !== undefined) {
						void invalidateGetInstrumentReminders(queryClient, instrumentId);
					}

					onSuccess?.();
				},
			},
		);
	};

	return { updateRemind };
}
