import { v } from '@/shared/lib/validation';

export const sessionFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
});

export const defaultFilters = v.parse(sessionFiltersSchema, {});
