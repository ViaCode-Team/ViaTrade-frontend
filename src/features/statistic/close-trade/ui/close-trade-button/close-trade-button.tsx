import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Trade } from '@/shared/api/types/gen/trade';

import { CloseTradeForm } from '../close-trade-form/close-trade-form';

type CloseTradeButtonProps = {
	trade: Trade;
};

export function CloseTradeButton({ trade }: CloseTradeButtonProps) {
	const openModal = () => {
		modals.open({
			title: 'Закрытие сделки',
			children: <CloseTradeForm trade={trade} />,
			size: 'sm',
		});
	};

	return (
		<Button onClick={openModal} size='compact-sm' variant='light'>
			Закрыть
		</Button>
	);
}
