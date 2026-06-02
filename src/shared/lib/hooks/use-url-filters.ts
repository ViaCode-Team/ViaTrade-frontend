import { useSearchParams } from 'react-router';

import { v } from '@/shared/model/validate';

export function useUrlFilters<TSchema extends v.BaseSchema<any, any, any>>(schema: TSchema) {
	const [searchParams, setSearchParams] = useSearchParams();

	const rawParams: Record<string, string> = {};
	searchParams.forEach((val, key) => {
		rawParams[key] = val;
	});

	const result = v.safeParse(schema, rawParams);
	const filters = (result.success ? result.output : v.parse(schema, {})) as v.InferOutput<TSchema>;
	const defaultValues = v.parse(schema, {}) as v.InferOutput<TSchema>;

	const setFilter = <K extends keyof v.InferOutput<TSchema>>(key: K, value: v.InferOutput<TSchema>[K] | string | null) => {
		setSearchParams(
			(prev) => {
				if (value !== null && value !== undefined && value !== defaultValues[key]) {
					prev.set(key as string, String(value));
				}
				else {
					prev.delete(key as string);
				}
				return prev;
			},
			{ replace: true },
		);
	};

	const setFilters = (newFilters: Partial<{ [K in keyof v.InferOutput<TSchema>]: v.InferOutput<TSchema>[K] | string | null }>) => {
		setSearchParams(
			(prev) => {
				Object.entries(newFilters).forEach(([key, value]) => {
					if (value !== null && value !== undefined && value !== defaultValues[key as keyof v.InferOutput<TSchema>]) {
						prev.set(key, String(value));
					}
					else {
						prev.delete(key);
					}
				});
				return prev;
			},
			{ replace: true },
		);
	};

	return { filters, setFilter, setFilters };
}
