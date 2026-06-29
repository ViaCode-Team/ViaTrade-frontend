const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

type Duration = {
	milliseconds?: number;
	seconds?: number;
	minutes?: number;
	hours?: number;
	days?: number;
	weeks?: number;
};

export const milliseconds = {
	fromMilliseconds: (value: number) => value * MILLISECOND,
	fromSeconds: (value: number) => value * SECOND,
	fromMinutes: (value: number) => value * MINUTE,
	fromHours: (value: number) => value * HOUR,
	fromDays: (value: number) => value * DAY,
	fromWeeks: (value: number) => value * WEEK,

	from: ({
		milliseconds = 0,
		seconds = 0,
		minutes = 0,
		hours = 0,
		days = 0,
		weeks = 0,
	}: Duration) =>
		milliseconds * MILLISECOND
		+ seconds * SECOND
		+ minutes * MINUTE
		+ hours * HOUR
		+ days * DAY
		+ weeks * WEEK,
} as const;
