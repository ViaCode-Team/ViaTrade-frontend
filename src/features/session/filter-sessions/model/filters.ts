import { v } from '@/shared/model/validate';

export const sessionFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
});

export const defaultFilters = v.parse(sessionFiltersSchema, {});
