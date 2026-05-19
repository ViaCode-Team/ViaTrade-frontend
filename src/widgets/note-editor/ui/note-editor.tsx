import { useState } from 'react';

import type {
	NoteFormData,
	StoredPersonalNote,
} from '@/entities/note';

import { NoteForm } from '@/features/note';

type NoteEditorProps = {
	note: StoredPersonalNote;
	onSave: (noteId: string, text: string) => void;
	placeholder?: string;
	isSaving?: boolean;
};

export function NoteEditor({
	note,
	onSave,
	placeholder = 'Текст заметки',
	isSaving,
}: NoteEditorProps) {
	const [draftText, setDraftText] = useState(note.text);

	function saveNote(formData: NoteFormData) {
		onSave(note.id, formData.text);
	}

	return (
		<NoteForm
			value={draftText}
			savedValue={note.text}
			placeholder={placeholder}
			minRows={4}
			maxRows={7}
			autoFocus
			isSubmitting={isSaving}
			onValueChange={setDraftText}
			onSubmit={saveNote}
		/>
	);
}
