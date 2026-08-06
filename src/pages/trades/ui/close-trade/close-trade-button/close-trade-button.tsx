import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { TradeResponse } from '@/shared/api';

import { CloseTradeForm } from '../close-trade-form/close-trade-form';

type CloseTradeButtonProps = {
	trade: TradeResponse;
};

function openCloseTradeModal(trade: TradeResponse) {
	modals.open({
		title: 'Закрыть сделку',
		children: <CloseTradeForm trade={trade} />,
	});
}

export function CloseTradeButton({ trade }: CloseTradeButtonProps) {
	return (
		<Button onClick={() => openCloseTradeModal(trade)} size='compact-sm' variant='light'>
			Закрыть
		</Button>
	);
}
