import { useMemo } from 'react';

import {
	useCreateInstrumentsLink,
	useDeleteInstrumentsLink,
	useGetAllInstrumentsLinkSuspense,
} from '@/entities/strategy/api/gen';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function StrategyStockBindingModal({ strategyId }: { strategyId: number }) {
	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();
	const serverSelectedStockIds = useMemo(
		() =>
			instrumentsLinkResponse.data
				.filter((link) => link.strategyId === strategyId)
				.map((link) => String(link.tradeCodeId)),
		[instrumentsLinkResponse.data, strategyId],
	);

	const { mutate: createLink } = useCreateInstrumentsLink();
	const { mutate: deleteLink } = useDeleteInstrumentsLink();

	const handleLinkedStocksChange = (nextStockIds: string[]) => {
		const added = nextStockIds.filter((id) => !serverSelectedStockIds.includes(id));
		const removed = serverSelectedStockIds.filter((id) => !nextStockIds.includes(id));

		added.forEach((id) => {
			createLink({ data: { strategyId, tradeCodeId: Number(id) } });
		});

		removed.forEach((id) => {
			deleteLink({ params: { strategyId, tradeCodeId: Number(id) } });
		});
	};

	return (
		<StrategyStockBinding
			selectedStockIds={serverSelectedStockIds}
			onSelectedStockIdsChange={handleLinkedStocksChange}
		/>
	);
}

export const StrategyStockBindingModalBoundary = withQueryBoundary(StrategyStockBindingModal);
