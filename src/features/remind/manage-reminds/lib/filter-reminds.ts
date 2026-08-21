import type { RemindItem } from '@/entities/reminder';

export function filterReminds(reminds: RemindItem[], searchQuery: string) {
	return searchQuery
		? reminds.filter((remind) => remind.text.toLowerCase().includes(searchQuery))
		: reminds;
}
