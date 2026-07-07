import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Trade } from '@/shared/api';

import { CloseTradeForm } from '../close-trade-form/close-trade-form';

type CloseTradeButtonProps = {
	trade: Trade;
};

function openModal(trade: Trade) {
	return () => modals.open({
		title: 'Закрытие сделки',
		children: <CloseTradeForm trade={trade} />,
	});
}

export function CloseTradeButton({ trade }: CloseTradeButtonProps) {
	const handleOpenModal = () => openModal(trade);

	return (
		<Button onClick={handleOpenModal} size='compact-sm' variant='light'>
			Закрыть
		</Button>
	);
}
