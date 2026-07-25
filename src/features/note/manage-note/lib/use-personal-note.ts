import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

import {
	createPersonalNote,
	getNoteId,
	type NoteFormData,
	type NoteSource,
	type PersonalNote,
	useAddUserInstrumentNote,
	useAddUserStrategyNote,
	useGetUserNotes,
	useUpdateUserInstrumentNote,
	useUpdateUserStrategyNote,
} from '@/entities/note';

import {
	useDeleteStoredPersonalNoteMutation,
	useSaveStoredPersonalNoteMutation,
	useStoredPersonalNotesQuery,
} from './use-stored-personal-notes';

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
		isLoading?: boolean;
		isSubmitting?: boolean;
		errorMessage?: string;
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
	const sourceId = source ? getNoteId(source) : null;
	const apiSourceId = getApiSourceId(source);
	const isStockNote = source?.type === 'stock';
	const isStrategyNote = source?.type === 'strategy';
	const isApiSource = apiSourceId !== null;

	const storedNotesQuery = useStoredPersonalNotesQuery();
	const storedDraftNote = source
		? storedNotesQuery.data?.find((note) => note.id === sourceId)
		: undefined;

	const instrumentNotesQuery = useGetUserNotes(undefined, {
		query: {
			enabled: isStockNote && isApiSource,
		},
	});
	const strategyNotesQuery = useGetUserNotes(undefined, {
		query: {
			enabled: isStrategyNote && isApiSource,
		},
	});
	const createInstrumentNoteMutation = useAddUserInstrumentNote();
	const updateInstrumentNoteMutation = useUpdateUserInstrumentNote();
	const createStrategyNoteMutation = useAddUserStrategyNote();
	const updateStrategyNoteMutation = useUpdateUserStrategyNote();
	const sourceNote = source?.type === 'stock'
		? instrumentNotesQuery.data?.data.items.find(
				(note) => note.tradeCode?.id === apiSourceId,
			)
		: strategyNotesQuery.data?.data.items.find(
				(note) => note.strategy?.id === apiSourceId,
			);
	const storedValue = sourceNote?.noteText ?? defaultValue;
	const isLoading = source?.type === 'stock'
		? instrumentNotesQuery.isLoading
		: source?.type === 'strategy'
			? strategyNotesQuery.isLoading
			: false;
	const mutationError = createInstrumentNoteMutation.error
		?? updateInstrumentNoteMutation.error
		?? createStrategyNoteMutation.error
		?? updateStrategyNoteMutation.error;
	const queryError = source?.type === 'stock'
		? instrumentNotesQuery.error
		: source?.type === 'strategy'
			? strategyNotesQuery.error
			: null;
	const errorMessage = queryError || mutationError
		? 'Не удалось синхронизировать заметку с API.'
		: undefined;
	const isSubmitting = createInstrumentNoteMutation.isPending
		|| updateInstrumentNoteMutation.isPending
		|| createStrategyNoteMutation.isPending
		|| updateStrategyNoteMutation.isPending;
	const [localDraft, setLocalDraft] = useState(() => ({
		sourceId: source ? getNoteId(source) : null,
		value: storedDraftNote?.text ?? defaultValue,
		isDirty: false,
	}));
	const [localSavedNote, setLocalSavedNote] = useState(() => ({
		sourceId: null as string | null,
		value: defaultValue,
	}));
	const saveDraftMutation = useSaveStoredPersonalNoteMutation();
	const deleteDraftMutation = useDeleteStoredPersonalNoteMutation();

	const savedValue = source
		? (
				localSavedNote.sourceId === sourceId
					? localSavedNote.value
					: storedValue
			)
		: localSavedNote.value;

	const uncontrolledValue = source
		? (
				localDraft.sourceId === sourceId && localDraft.isDirty
					? localDraft.value
					: (storedDraftNote?.text ?? savedValue)
			)
		: localDraft.value;
	const noteText = value ?? uncontrolledValue;

	const debouncedSaveDraft = useDebouncedCallback((text: string) => {
		if (!source || sourceId === null) {
			return;
		}

		if (text.trim() === savedValue.trim()) {
			deleteDraftMutation.mutate(sourceId);
		}
		else {
			saveDraftMutation.mutate({ source, text });
		}
	}, 600);

	const handleNoteTextChange = (nextValue: string) => {
		if (value === undefined) {
			setLocalDraft({
				sourceId,
				value: nextValue,
				isDirty: true,
			});
		}

		onValueChange?.(nextValue);
		debouncedSaveDraft(nextValue);
	};

	const saveApiNote = ({
		source,
		sourceId,
		hasNote,
		text,
	}: {
		source: NoteSource;
		sourceId: number;
		hasNote: boolean;
		text: string;
	}) => {
		const requestData = { noteText: text };
		const onSuccess = () => {
			debouncedSaveDraft.cancel();
			const nextNote = createPersonalNote({ text });

			setLocalSavedNote({
				sourceId: getNoteId(source),
				value: nextNote.text,
			});
			setLocalDraft({
				sourceId: getNoteId(source),
				value: nextNote.text,
				isDirty: false,
			});
			if (sourceId) {
				deleteDraftMutation.mutate(getNoteId(source));
			}
			onNoteSave?.(nextNote);
		};

		if (source.type === 'stock') {
			const mutation = hasNote
				? updateInstrumentNoteMutation
				: createInstrumentNoteMutation;

			mutation.mutate(
				{ tradeCodeId: sourceId, data: requestData },
				{ onSuccess },
			);
			return;
		}

		const mutation = hasNote
			? updateStrategyNoteMutation
			: createStrategyNoteMutation;

		mutation.mutate(
			{ strategyId: sourceId, data: requestData },
			{ onSuccess },
		);
	};

	const handleNoteSubmit = (formData: NoteFormData) => {
		if (source && apiSourceId !== null) {
			saveApiNote({
				source,
				sourceId: apiSourceId,
				hasNote: Boolean(sourceNote),
				text: formData.text,
			});

			return;
		}

		debouncedSaveDraft.cancel();
		const nextNote = createPersonalNote(formData);

		setLocalSavedNote({
			sourceId,
			value: nextNote.text,
		});
		setLocalDraft({
			sourceId,
			value: nextNote.text,
			isDirty: false,
		});
		if (sourceId) {
			deleteDraftMutation.mutate(sourceId);
		}
		onNoteSave?.(nextNote);
	};

	return {
		noteText,
		savedValue,
		noteFormProps: {
			value: noteText,
			savedValue,
			isLoading,
			isSubmitting,
			errorMessage,
			onValueChange: handleNoteTextChange,
			onSubmit: handleNoteSubmit,
		},
	};
}

function getApiSourceId(source: NoteSource | undefined) {
	if (!source) {
		return null;
	}

	const sourceId = Number(source.id);

	return Number.isInteger(sourceId) && sourceId > 0 ? sourceId : null;
}
