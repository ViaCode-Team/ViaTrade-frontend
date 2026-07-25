import {
	Button,
	Group,
	Loader,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type { Stock } from '@/entities/stock';

import { mapTradeCodeToStock } from '@/entities/stock';
import {
	getGetStockCodesQueryKey,
	getStockCodes,
} from '@/entities/trade-code';
import { useCreateRemind } from '@/features/remind/manage-reminds';

const STOCKS_PAGE_SIZE = 20;

export function AddRemind() {
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
	const stocksQuery = useInfiniteQuery({
		queryKey: getGetStockCodesQueryKey({ pageSize: STOCKS_PAGE_SIZE }),
		queryFn: ({ pageParam }) => getStockCodes({ page: pageParam, pageSize: STOCKS_PAGE_SIZE }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.data.page < lastPage.data.totalPages
				? lastPage.data.page + 1
				: undefined,
	});
	const stocks = useMemo(() => getLoadedStocks(stocksQuery.data?.pages), [stocksQuery.data?.pages]);
	const { createRemind, isPending } = useCreateRemind();

	const stockSelectData = stocks.map((stock) => ({
		value: stock.id,
		label: `${stock.ticker} — ${stock.name}`,
	}));

	const handleAdd = () => {
		if (!selectedStockId) {
			return;
		}

		const stock = stocks.find((s) => s.id === selectedStockId);

		if (!stock) {
			return;
		}

		createRemind(stock.instrumentId, () => modals.closeAll());
	};

	const loadNextPage = () => {
		if (!stocksQuery.hasNextPage || stocksQuery.isFetchingNextPage) {
			return;
		}

		void stocksQuery.fetchNextPage();
	};

	return (
		<Stack gap='md'>
			<Text size='sm' c='dimmed'>
				Выберите акцию, к которой будет привязано напоминание.
			</Text>

			<Select
				label='Акция'
				placeholder='Акция...'
				data={stockSelectData}
				value={selectedStockId}
				onChange={setSelectedStockId}
				searchable
				nothingFoundMessage='Акции не найдены'
				withAsterisk
				scrollAreaProps={{ onBottomReached: loadNextPage }}
				rightSection={stocksQuery.isFetchingNextPage ? <Loader size='xs' /> : undefined}
				disabled={isPending}
			/>

			<Group justify='flex-end' mt='md'>
				<Button variant='default' onClick={() => modals.closeAll()} disabled={isPending}>
					Отмена
				</Button>
				<Button onClick={handleAdd} disabled={!selectedStockId || isPending} loading={isPending}>
					Создать
				</Button>
			</Group>
		</Stack>
	);
}

function getLoadedStocks(pages: Awaited<ReturnType<typeof getStockCodes>>[] | undefined): Stock[] {
	if (!pages) {
		return [];
	}

	const stockIds = new Set<number>();

	return pages.flatMap((page) => page.data.items)
		.filter((stock) => {
			if (stockIds.has(stock.id)) {
				return false;
			}

			stockIds.add(stock.id);
			return true;
		})
		.map(mapTradeCodeToStock);
}
