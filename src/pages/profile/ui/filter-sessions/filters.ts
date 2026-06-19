import { v } from '@/shared/model';

export const sessionFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
});

export const defaultFilters = v.parse(sessionFiltersSchema, {});
