import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { TradeResponse } from '@/shared/api';

import { CloseTradeForm } from '../close-trade-form/close-trade-form';

type CloseTradeButtonProps = {
	trade: TradeResponse;
};

function openModal(trade: TradeResponse) {
	return modals.open({
		title: 'Закрытие сделки',
		children: <CloseTradeForm trade={trade} />,
	});
}

export function CloseTradeButton({ trade }: CloseTradeButtonProps) {
	return (
		<Button onClick={() => openModal(trade)} size='compact-sm' variant='light'>
			Закрыть
		</Button>
	);
}
