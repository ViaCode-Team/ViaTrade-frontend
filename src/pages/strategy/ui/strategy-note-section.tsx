import { useMemo } from 'react';
import { generatePath } from 'react-router';

import type { Strategy } from '@/entities/strategy';

import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { ROUTES } from '@/shared/model';
import { Section } from '@/shared/ui/section';

type StrategyNoteSectionProps = {
	strategyId: number | null;
	strategySummary?: Strategy;
};

export function StrategyNoteSection({ strategyId, strategySummary }: StrategyNoteSectionProps) {
	const strategyNoteSource = useMemo(() => {
		if (strategyId === null) {
			return undefined;
		}

		return {
			type: 'strategy' as const,
			id: String(strategyId),
			label: strategySummary?.name ?? `Стратегия #${strategyId}`,
			description: strategySummary?.description ?? 'Торговая стратегия',
			path: generatePath(ROUTES.STRATEGY, { strategyName: strategySummary?.name ?? String(strategyId) }),
		};
	}, [strategyId, strategySummary]);

	const strategyNote = usePersonalNote({ source: strategyNoteSource });

	if (strategyId === null) {
		return null;
	}

	return (
		<Section header={{ title: 'Заметка к стратегии' }}>
			<NoteForm
				{...strategyNote.noteFormProps}
				placeholder='Условия, риски, наблюдения...'
			/>
		</Section>
	);
}
