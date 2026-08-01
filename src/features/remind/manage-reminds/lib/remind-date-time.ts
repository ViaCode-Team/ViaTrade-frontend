export function getCurrentReminderDateTime() {
	const now = new Date();
	now.setUTCSeconds(0, 0);
	now.setUTCMinutes(now.getUTCMinutes() + 1);

	return now.toISOString();
}

export function getReminderDateTimeFromLocalParts(date: string, time: string) {
	return new Date(`${date}T${time}:00`).toISOString();
}
