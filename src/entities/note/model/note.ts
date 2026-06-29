import { v } from '@/shared/lib/validation';

export const noteFormSchema = v.object({
	text: v.string('Введите заметку'),
});

export type NoteFormData = v.InferInput<typeof noteFormSchema>;

export type PersonalNote = {
	text: string;
};

export type NoteSourceType = 'stock' | 'strategy';

export type NoteSource = {
	type: NoteSourceType;
	id: string;
	label: string;
	description?: string;
	path: string;
};

export type StoredPersonalNote = PersonalNote & {
	id: string;
	source: NoteSource;
};

export function getNormalizedNoteFormData(formData: NoteFormData): NoteFormData {
	return {
		text: formData.text.trim(),
	};
}

export function validateNoteForm(data: unknown) {
	return v.safeParse(noteFormSchema, data);
}

export function getNoteFormErrors(
	result: ReturnType<typeof validateNoteForm>,
): Partial<Record<keyof NoteFormData, string>> {
	if (!result.success) {
		const { nested } = v.flatten(result.issues);

		return {
			text: nested?.text?.[0],
		};
	}

	return {};
}

export function createPersonalNote(formData: NoteFormData): PersonalNote {
	const normalizedFormData = getNormalizedNoteFormData(formData);

	return {
		text: normalizedFormData.text,
	};
}

export function getNoteId(source: NoteSource) {
	return `${source.type}:${source.id}`;
}
