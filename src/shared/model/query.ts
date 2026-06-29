import { milliseconds } from '@/shared/lib/milliseconds';

export const QUERY_CACHE_MAX_AGE = milliseconds.fromDays(7);
export const QUERY_REFETCH_INTERVAL = milliseconds.fromMinutes(5);
export const QUERY_REFETCH_INTERVAL_TEXT = 'Автообновление: 5 мин';
export const STATIC_QUERY_STALE_TIME = Number.POSITIVE_INFINITY;
