import { useMemo } from 'react';

import {
	useCreateUserStrategyCode,
	useDeleteUserStrategyCode,
	useGetUserStrategyCodesSuspense,
} from '@/entities/strategy';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function StrategyStockBindingModal({ strategyId }: { strategyId: number }) {
	const { data: instrumentsLinkResponse } = useGetUserStrategyCodesSuspense({ page: 1, pageSize: 100 });
	const serverSelectedStockIds = useMemo(
		() =>
			instrumentsLinkResponse.data.items
				.filter((link) => link.strategyId === strategyId)
				.map((link) => String(link.tradeCodeId)),
		[instrumentsLinkResponse.data.items, strategyId],
	);

	const { mutate: createLink } = useCreateUserStrategyCode();
	const { mutate: deleteLink } = useDeleteUserStrategyCode();

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
