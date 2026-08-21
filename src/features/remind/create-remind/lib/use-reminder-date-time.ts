import { useState } from 'react';

import {
	getDefaultReminderDateTime,
	isFutureReminderDateTime,
} from '@/entities/reminder';

export function useReminderDateTime() {
	const [value, setValue] = useState<string | null>(getDefaultReminderDateTime);
	const [minimumDate] = useState(() => new Date());

	return {
		value,
		setValue,
		minimumDate,
		isValid: isFutureReminderDateTime(value),
	};
}
