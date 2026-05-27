import { Stack } from '@mantine/core';

import type { NoteFormData } from '@/features/note/manage-note';

import {
	NoteForm,
	useNoteDraft,
} from '@/features/note/manage-note';

import type { DraftedPersonalNote } from '../model/note-drafts';

import { NoteCardHeader } from './note-card-header';

type NoteCardProps = {
	note: DraftedPersonalNote;
	isSaving?: boolean;
	isDeleting?: boolean;
	onSave: (
		note: DraftedPersonalNote,
		text: string,
		onSuccess: () => void,
	) => void;
	onDelete: (note: DraftedPersonalNote, onSuccess: () => void) => void;
};

export function NoteCard({
	note,
	isSaving,
	isDeleting,
	onSave,
	onDelete,
}: NoteCardProps) {
	const noteDraft = useNoteDraft({
		note,
		value: note.text,
		savedValue: note.apiText,
	});

	function saveApiNote(formData: NoteFormData) {
		onSave(note, formData.text, () => {
			noteDraft.confirmSaved(formData.text);
		});
	}

	return (
		<section>
			<Stack flex={1} gap='md'>
				<NoteCardHeader
					note={note}
					isDeleting={isDeleting}
					onDelete={() => onDelete(note, noteDraft.discardDraft)}
				/>

				<NoteForm
					value={noteDraft.value}
					savedValue={note.apiText}
					placeholder='Текст заметки'
					minRows={4}
					maxRows={7}
					isSubmitting={isSaving}
					onValueChange={noteDraft.onValueChange}
					onSubmit={saveApiNote}
				/>
			</Stack>
		</section>
	);
}
