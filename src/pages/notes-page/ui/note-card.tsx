import {
	Stack,
} from '@mantine/core';

import type { StoredPersonalNote } from '@/entities/note';

import { NoteEditor } from '@/widgets/note-editor';

import { NoteCardHeader } from './note-card-header';

type NoteCardProps = {
	note: StoredPersonalNote;
	isSaving?: boolean;
	isDeleting?: boolean;
	onSave: (noteId: string, text: string) => void;
	onDelete: (noteId: string) => void;
};

export function NoteCard({
	note,
	isSaving,
	isDeleting,
	onSave,
	onDelete,
}: NoteCardProps) {
	return (
		<section>
			<Stack flex={1} gap='md'>
				<NoteCardHeader
					note={note}
					isDeleting={isDeleting}
					onDelete={() => onDelete(note.id)}
				/>

				<NoteEditor
					note={note}
					isSaving={isSaving}
					onSave={onSave}
				/>
			</Stack>
		</section>
	);
}
