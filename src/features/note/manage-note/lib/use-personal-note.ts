import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

import {
	useGetNote as useGetInstrumentNote,
	useUpsertNote as useUpsertInstrumentNote,
} from '@/entities/instrument';
import {
	createPersonalNote,
	getNoteId,
	type NoteFormData,
	type NoteSource,
	type PersonalNote,
} from '@/entities/note';
import {
	useGetNote as useGetStrategyNote,
	useUpsertNote as useUpsertStrategyNote,
} from '@/entities/strategy';
import { isApiErrorWithStatus } from '@/shared/api';

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
	text: string;
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

	const instrumentNoteQuery = useGetInstrumentNote(apiSourceId ?? 0, {
		query: {
			enabled: isStockNote && isApiSource,
		},
	});
	const strategyNoteQuery = useGetStrategyNote(apiSourceId ?? 0, {
		query: {
			enabled: isStrategyNote && isApiSource,
		},
	});
	const upsertInstrumentNoteMutation = useUpsertInstrumentNote();
	const upsertStrategyNoteMutation = useUpsertStrategyNote();
	const sourceNote = source?.type === 'stock'
		? instrumentNoteQuery.data?.data
		: strategyNoteQuery.data?.data;
	const storedValue = sourceNote?.text ?? defaultValue;
	const isLoading = source?.type === 'stock'
		? instrumentNoteQuery.isLoading
		: source?.type === 'strategy'
			? strategyNoteQuery.isLoading
			: false;
	const mutationError = upsertInstrumentNoteMutation.error
		?? upsertStrategyNoteMutation.error;
	const queryError = source?.type === 'stock'
		? instrumentNoteQuery.error
		: source?.type === 'strategy'
			? strategyNoteQuery.error
			: null;
	const errorMessage = (!isApiErrorWithStatus(queryError, 404) && queryError) || mutationError
		? 'Не удалось синхронизировать заметку с API.'
		: undefined;
	const isSubmitting = upsertInstrumentNoteMutation.isPending
		|| upsertStrategyNoteMutation.isPending;
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
	const text = value ?? uncontrolledValue;

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
		text,
	}: {
		source: NoteSource;
		sourceId: number;
		text: string;
	}) => {
		const requestData = { text };
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
			upsertInstrumentNoteMutation.mutate(
				{ instrumentId: sourceId, data: requestData },
				{ onSuccess },
			);
			return;
		}

		upsertStrategyNoteMutation.mutate(
			{ strategyId: sourceId, data: requestData },
			{ onSuccess },
		);
	};

	const handleNoteSubmit = (formData: NoteFormData) => {
		if (source && apiSourceId !== null) {
			saveApiNote({
				source,
				sourceId: apiSourceId,
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
		text,
		savedValue,
		noteFormProps: {
			value: text,
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
