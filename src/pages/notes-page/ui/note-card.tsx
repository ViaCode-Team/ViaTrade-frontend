import {
	Stack,
} from '@mantine/core';

import type { StoredPersonalNote } from '@/entities/note';

import { NoteEditor } from '@/widgets/note-editor';

import { NoteCardHeader } from './note-card-header';

type NoteCardProps = {
	note: StoredPersonalNote;
	onSave: (noteId: string, text: string) => void;
	onDelete: (noteId: string) => void;
};

export function NoteCard({ note, onSave, onDelete }: NoteCardProps) {
	return (
		<section>
			<Stack flex={1} gap='md'>
				<NoteCardHeader
					note={note}
					onDelete={() => onDelete(note.id)}
				/>

				<NoteEditor
					note={note}
					onSave={onSave}
				/>
			</Stack>
		</section>
	);
}
