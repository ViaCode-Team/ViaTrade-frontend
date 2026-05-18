import { useSyncExternalStore } from 'react';

import {
	deleteStoredPersonalNote,
	getStoredPersonalNotes,
	subscribeStoredPersonalNotes,
	updateStoredPersonalNote,
} from './note-storage';

export function useStoredPersonalNotes() {
	const notes = useSyncExternalStore(
		subscribeStoredPersonalNotes,
		getStoredPersonalNotes,
		() => [],
	);

	return {
		notes,
		deleteNote: deleteStoredPersonalNote,
		updateNote: updateStoredPersonalNote,
	};
}
