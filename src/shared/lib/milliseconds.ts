const MILLISECOND = 1 as const;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const MAX_MS = Number.MAX_SAFE_INTEGER;

type Duration = {
	milliseconds?: number;
	seconds?: number;
	minutes?: number;
	hours?: number;
	days?: number;
	weeks?: number;
};

/**
 * Sanitises a raw numeric input:
 * - Non-finite values (NaN, ±Infinity) become 0.
 * - Negative values are clamped to 0.
 * - Fractional values are truncated.
 * - Values that would overflow MAX_SAFE_INTEGER after unit multiplication
 *   are clamped to MAX_SAFE_INTEGER.
 */
function sanitise(value: number, unitMultiplier: number): number {
	if (!Number.isFinite(value) || value < 0)
		return 0;

	const truncated = Math.trunc(value);

	const maxAllowed = Math.trunc(MAX_MS / unitMultiplier);
	return Math.min(truncated, maxAllowed) * unitMultiplier;
}

export const milliseconds = {
	fromMilliseconds: (value: number) => sanitise(value, MILLISECOND),
	fromSeconds: (value: number) => sanitise(value, SECOND),
	fromMinutes: (value: number) => sanitise(value, MINUTE),
	fromHours: (value: number) => sanitise(value, HOUR),
	fromDays: (value: number) => sanitise(value, DAY),
	fromWeeks: (value: number) => sanitise(value, WEEK),

	from: ({
		milliseconds = 0,
		seconds = 0,
		minutes = 0,
		hours = 0,
		days = 0,
		weeks = 0,
	}: Duration) => {
		const total
			= sanitise(milliseconds, MILLISECOND)
				+ sanitise(seconds, SECOND)
				+ sanitise(minutes, MINUTE)
				+ sanitise(hours, HOUR)
				+ sanitise(days, DAY)
				+ sanitise(weeks, WEEK);

		return Math.min(total, MAX_MS);
	},
} as const;
