export type NotificationItem = {
	id: string;
	text: string;
	date: string;
	time: string;
};

export type NotificationEditableField = Exclude<keyof NotificationItem, 'id'>;

export function createNotificationItem(): NotificationItem {
	const now = new Date();

	return {
		id: crypto.randomUUID(),
		text: '',
		date: formatNotificationDate(now),
		time: formatNotificationTime(now),
	};
}

export function createNotificationCopy(notification: NotificationItem): NotificationItem {
	return {
		...notification,
		id: crypto.randomUUID(),
	};
}

function formatNotificationDate(date: Date) {
	const year = date.getFullYear();
	const month = padDatePart(date.getMonth() + 1);
	const day = padDatePart(date.getDate());

	return `${year}-${month}-${day}`;
}

function formatNotificationTime(date: Date) {
	const hours = padDatePart(date.getHours());
	const minutes = padDatePart(date.getMinutes());

	return `${hours}:${minutes}`;
}

function padDatePart(value: number) {
	return String(value).padStart(2, '0');
}
