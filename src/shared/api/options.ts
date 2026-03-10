import type { QueryOptions } from '@tanstack/react-query';

export type GenQueryOptions<T> = Omit<QueryOptions<T, Error>, 'queryKey' | 'queryFn'>;
