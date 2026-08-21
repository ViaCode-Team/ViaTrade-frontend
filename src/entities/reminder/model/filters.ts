import type { ReminderDeliveryStatus as ApiReminderDeliveryStatus } from '@/shared/api';

import { v } from '@/shared/lib/validation';

export type RemindSortOption = 'date-asc' | 'date-desc';
export type ReminderDeliveryStatus = ApiReminderDeliveryStatus;

export const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

export const reminderDeliveryStatusOptions = [
	{ value: 'all', label: 'Все' },
	{ value: 'undelivered', label: 'Ожидаются' },
	{ value: 'delivered', label: 'Отправлены' },
];

export const remindFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	page: v.fallback(v.string(), '1'),
	listSort: v.fallback(
		v.picklist(['date-asc', 'date-desc']),
		'date-desc',
	),
	deliveryStatus: v.fallback(
		v.picklist(['all', 'undelivered', 'delivered']),
		'undelivered',
	),
});

export const defaultFilters = v.parse(remindFiltersSchema, {});
