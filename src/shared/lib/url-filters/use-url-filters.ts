import { useSearchParams } from 'react-router';

import { v } from '@/shared/lib/validation';

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
				const defaultValue = defaultValues[key];
				const isDefault
					= value === defaultValue
						|| (Array.isArray(value) && Array.isArray(defaultValue) && value.join(',') === (defaultValue as any[]).join(','));

				if (value !== null && value !== undefined && !isDefault) {
					prev.set(key as string, Array.isArray(value) ? value.join(',') : String(value));
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
					const defaultValue = defaultValues[key as keyof v.InferOutput<TSchema>];
					const isDefault
						= value === defaultValue
							|| (Array.isArray(value) && Array.isArray(defaultValue) && value.join(',') === (defaultValue as any[]).join(','));

					if (value !== null && value !== undefined && !isDefault) {
						prev.set(key, Array.isArray(value) ? value.join(',') : String(value));
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

	const resetFilters = () => {
		setSearchParams(
			(prev) => {
				Object.keys(defaultValues).forEach((key) => prev.delete(key));
				return prev;
			},
			{ replace: true },
		);
	};

	return {
		filters,
		setFilter,
		setFilters,
		resetFilters,
	};
}
