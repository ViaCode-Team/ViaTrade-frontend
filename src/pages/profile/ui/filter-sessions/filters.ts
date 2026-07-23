import { v } from '@/shared/lib/validation';

export const sessionFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	page: v.fallback(v.string(), '1'),
});

export const defaultFilters = v.parse(sessionFiltersSchema, {});
