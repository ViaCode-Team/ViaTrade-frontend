import type { TradeRemind } from '@/shared/api';

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
	source?: RemindSource;
};

export type RemindEditableField = Exclude<keyof RemindItem, 'id'>;

export function mapTradeRemindToRemindItem(tradeRemind: TradeRemind): RemindItem {
	const dt = new Date(tradeRemind.dateTime);
	const date = formatRemindDate(dt);
	const time = formatRemindTime(dt);

	return {
		id: tradeRemind.id.toString(),
		text: tradeRemind.textRemind,
		date,
		time,
		source: {
			type: 'stock',
			id: tradeRemind.tradeCodeId.toString(),
			label: `Инструмент #${tradeRemind.tradeCodeId}`, // Fallback label, might need joining with TradeCode data
		},
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
