import { useSearchParams } from 'react-router';

export function useUrlFilters<T extends Record<string, string>>(defaultValues: T) {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = Object.keys(defaultValues).reduce((acc, key) => {
		const val = searchParams.get(key);
		acc[key as keyof T] = val ? (val as any) : defaultValues[key];
		return acc;
	}, {} as T);

	const setFilter = <K extends keyof T>(key: K, value: T[K] | string | null) => {
		setSearchParams(
			(prev) => {
				if (value && value !== defaultValues[key]) {
					prev.set(key as string, value as string);
				}
				else {
					prev.delete(key as string);
				}
				return prev;
			},
			{ replace: true },
		);
	};

	const setFilters = (newFilters: Partial<{ [K in keyof T]: T[K] | string | null }>) => {
		setSearchParams(
			(prev) => {
				Object.entries(newFilters).forEach(([key, value]) => {
					if (value && value !== defaultValues[key as keyof T]) {
						prev.set(key, value as string);
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
