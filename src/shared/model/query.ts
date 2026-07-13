import { milliseconds } from '@/shared/lib/milliseconds';

export const QUERY_PERSIST_MAX_AGE = Infinity;
export const QUERY_REFETCH_INTERVAL = milliseconds.fromMinutes(3);
export const QUERY_STALE_TIME = milliseconds.fromSeconds(10);
export const QUERY_REFETCH_INTERVAL_TEXT = 'Автообновление: 3 мин';
export const STATIC_QUERY_STALE_TIME = Infinity;
