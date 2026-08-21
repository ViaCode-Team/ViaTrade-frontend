import { useState } from 'react';

import { useCreateInstrumentReminder } from '@/entities/instrument';

import {
	type CreateRemindError,
	getCreateRemindError,
} from './create-remind-error';

type CreateRemindOptions = {
	instrumentId: number;
	text: string;
	remindAt: string;
	onSuccess?: () => void;
};

export function useCreateRemind() {
	const [error, setError] = useState<CreateRemindError | null>(null);
	const createReminderMutation = useCreateInstrumentReminder();

	const createRemind = ({ instrumentId, text, remindAt, onSuccess }: CreateRemindOptions) => {
		setError(null);

		createReminderMutation.mutate(
			{
				instrumentId,
				data: {
					text,
					remindAt,
				},
			},
			{
				onSuccess: () => {
					onSuccess?.();
				},
				onError: (error) => {
					setError(getCreateRemindError(error));
				},
			},
		);
	};

	return {
		createRemind,
		error,
		isPending: createReminderMutation.isPending,
	};
}
