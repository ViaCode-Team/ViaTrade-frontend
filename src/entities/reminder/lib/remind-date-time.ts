type ReminderDateTimeParts = {
	date: string;
	time: string;
};

export function getDefaultReminderDateTime() {
	const reminderDateTime = new Date();

	reminderDateTime.setDate(reminderDateTime.getDate() + 1);
	reminderDateTime.setSeconds(0, 0);

	return formatReminderDateTime(reminderDateTime);
}

export function getReminderDateTimeFromLocalParts(date: string, time: string) {
	return getReminderDateTimeAsIso(`${date} ${time}:00`);
}

export function getReminderDateTimeAsIso(value: string) {
	return parseReminderDateTime(value).toISOString();
}

export function isFutureReminderDateTime(value: string | null) {
	return value !== null && parseReminderDateTime(value) > new Date();
}

export function getReminderDateTimePickerValue({ date, time }: ReminderDateTimeParts) {
	return date && time ? `${date} ${time}:00` : null;
}

function formatReminderDateTime(date: Date) {
	const year = date.getFullYear();
	const month = formatDateTimePart(date.getMonth() + 1);
	const day = formatDateTimePart(date.getDate());
	const hours = formatDateTimePart(date.getHours());
	const minutes = formatDateTimePart(date.getMinutes());

	return `${year}-${month}-${day} ${hours}:${minutes}:00`;
}

function parseReminderDateTime(value: string) {
	return new Date(value.replace(' ', 'T'));
}

function formatDateTimePart(value: number) {
	return String(value).padStart(2, '0');
}
