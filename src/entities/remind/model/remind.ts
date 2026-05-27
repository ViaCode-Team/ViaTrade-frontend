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

export function createRemindItem(source?: RemindSource): RemindItem {
	const now = new Date();

	return {
		id: crypto.randomUUID(),
		text: '',
		date: formatRemindDate(now),
		time: formatRemindTime(now),
		source,
	};
}

export function createRemindCopy(remind: RemindItem): RemindItem {
	return {
		...remind,
		id: crypto.randomUUID(),
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
