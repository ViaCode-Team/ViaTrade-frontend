import type { GetInstrumentRemindersParams } from '@/shared/api';

import { useGetInstrumentRemindersSuspense } from '@/entities/instrument';
import { mapTradeRemindToRemindItem } from '@/entities/reminder';

export function useInstrumentReminds(instrumentId: number, params: GetInstrumentRemindersParams) {
	const { data: response } = useGetInstrumentRemindersSuspense(instrumentId, params);

	return {
		reminds: response.data.items.map(mapTradeRemindToRemindItem),
		totalCount: response.data.totalCount,
		totalPages: response.data.totalPages,
	};
}
