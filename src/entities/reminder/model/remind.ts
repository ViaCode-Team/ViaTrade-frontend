import type { ReminderResponse } from '@/shared/api';

export type RemindSource = {
	type: 'stock';
	id: string;
	label?: string;
};

export type RemindItem = {
	id: string;
	text: string;
	date: string;
	time: string;
	deliveredAt?: string;
	source?: RemindSource;
};

export type RemindEditableField = Exclude<keyof RemindItem, 'id'>;

export function mapTradeRemindToRemindItem(tradeRemind: ReminderResponse): RemindItem {
	const dt = new Date(tradeRemind.remindAt);
	const date = formatRemindDate(dt);
	const time = formatRemindTime(dt);

	return {
		id: tradeRemind.id.toString(),
		text: tradeRemind.text,
		date,
		time,
		deliveredAt: tradeRemind.deliveredAt,
		source: tradeRemind.instrument
			? {
					type: 'stock',
					id: String(tradeRemind.instrument.id),
					label: tradeRemind.instrument.symbol,
				}
			: undefined,
	};
}

function formatRemindDate(date: Date) {
	const year = date.getFullYear();
	const month = padDatePart(date.getMonth() + 1);
	const day = padDatePart(date.getDate());

	return `${year}-${month}-${day}`;
}

function formatRemindTime(date: Date) {
	const hours = padDatePart(date.getHours());
	const minutes = padDatePart(date.getMinutes());

	return `${hours}:${minutes}`;
}

function padDatePart(value: number) {
	return String(value).padStart(2, '0');
}
