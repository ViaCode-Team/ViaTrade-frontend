import type { FallbackProps } from 'react-error-boundary';

import { Flex, Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { useGetInstrumentByIdSuspense } from '@/entities/instrument';
import { mapInstrumentToStock } from '@/entities/stock';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StockReminds } from '@/pages/stock/ui/stock-reminds';
import { ApiError, isProblemDetails } from '@/shared/api';
import { ROUTES } from '@/shared/model';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { ErrorFallback } from '@/shared/ui/errorFallback';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';
import { StockLinkedStrategies } from '@/widgets/stock-linked-strategies';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';
import { StockNotFound } from './ui/stock-not-found';

const StockPageBoundary = withQueryBoundary(StockPageBase, {
	errorFallbackProps: {
		FallbackComponent: StockPageErrorFallback,
	},
});

export function StockPage() {
	return (
		<Stack>
			<Flex justify='space-between' align='center'>
				<BackToStocksLink />
				<DataFreshness />
			</Flex>

			<StockPageBoundary />
		</Stack>
	);
}

function StockPageBase() {
	const { stockId } = useParams();

	const instrumentId = Number(stockId);
	if (!Number.isInteger(instrumentId) || instrumentId < 1) {
		return <StockNotFound />;
	}

	return <StockPageContent instrumentId={instrumentId} />;
}

type StockPageContentProps = {
	instrumentId: number;
};

function StockPageContent({ instrumentId }: StockPageContentProps) {
	const { data: stockResponse } = useGetInstrumentByIdSuspense(instrumentId);
	const stock = mapInstrumentToStock(stockResponse.data);

	const stockNoteSource = useMemo(
		() => stock
			? {
					type: 'stock' as const,
					id: String(stock.instrumentId),
					label: stock.ticker,
					description: stock.name,
					path: generatePath(ROUTES.STOCK, { stockId: String(stock.instrumentId) }),
				}
			: undefined,
		[stock],
	);

	const stockNote = usePersonalNote({ source: stockNoteSource });

	return (
		<>
			<StockHero stock={stock} />

			<Section
				header={{
					title: 'Связанные стратегии',
					description: `Стратегии, связанные с этой акцией.`,
				}}
			>
				<StockLinkedStrategies stockId={stock.instrumentId} />
			</Section>

			<Section header={{ title: 'Заметка к акции' }}>
				<NoteForm
					{...stockNote.noteFormProps}
					placeholder='Условия входа, сценарии, риски...'
				/>
			</Section>

			<Section header={{ title: 'Напоминания к акции' }}>
				<StockReminds stock={stock} />
			</Section>
		</>
	);
}

function StockPageErrorFallback(props: FallbackProps) {
	if (
		props.error instanceof ApiError
		&& isProblemDetails(props.error.details)
		&& props.error.details.status === 404
	) {
		return <StockNotFound />;
	}

	return <ErrorFallback {...props} />;
}
