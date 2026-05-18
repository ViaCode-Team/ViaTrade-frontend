import {
	useState,
	useSyncExternalStore,
} from 'react';

import {
	createPersonalNote,
	getNoteId,
	getStoredPersonalNotes,
	type NoteFormData,
	type NoteSource,
	type PersonalNote,
	saveStoredPersonalNote,
	subscribeStoredPersonalNotes,
} from '@/entities/note';

type UsePersonalNoteOptions = {
	source?: NoteSource;
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onNoteSave?: (note: PersonalNote) => void;
};

type UsePersonalNoteReturn = {
	noteText: string;
	savedValue: string;
	noteFormProps: {
		value: string;
		savedValue: string;
		onValueChange: (value: string) => void;
		onSubmit: (formData: NoteFormData) => void;
	};
};

export function usePersonalNote({
	source,
	value,
	defaultValue = '',
	onValueChange,
	onNoteSave,
}: UsePersonalNoteOptions = {}): UsePersonalNoteReturn {
	const [localDraft, setLocalDraft] = useState(() => ({
		sourceId: source ? getNoteId(source) : null,
		value: defaultValue,
	}));
	const [localSavedValue, setLocalSavedValue] = useState(defaultValue);
	const storedNotes = useSyncExternalStore(
		subscribeStoredPersonalNotes,
		getStoredPersonalNotes,
		() => [],
	);
	const sourceId = source ? getNoteId(source) : null;
	const storedNote = source
		? storedNotes.find((note) => note.id === sourceId)
		: null;
	const storedValue = storedNote?.text ?? defaultValue;
	const uncontrolledValue = source
		? (localDraft.sourceId === sourceId ? localDraft.value : storedValue)
		: localDraft.value;
	const noteText = value ?? uncontrolledValue;
	const savedValue = source ? storedValue : localSavedValue;

	const handleNoteTextChange = (nextValue: string) => {
		if (value === undefined) {
			setLocalDraft({
				sourceId,
				value: nextValue,
			});
		}

		onValueChange?.(nextValue);
	};

	const handleNoteSubmit = (formData: NoteFormData) => {
		const nextNote = source
			? saveStoredPersonalNote(source, formData.text)
			: createPersonalNote(formData);

		setLocalSavedValue(nextNote.text);
		setLocalDraft({
			sourceId,
			value: nextNote.text,
		});
		onNoteSave?.(nextNote);
	};

	return {
		noteText,
		savedValue,
		noteFormProps: {
			value: noteText,
			savedValue,
			onValueChange: handleNoteTextChange,
			onSubmit: handleNoteSubmit,
		},
	};
}
