import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import type { Trade } from '@/shared/api';

type CloseTradeButtonProps = {
	trade: Trade;
};

const { CloseTradeForm } = lazily(() => import('../close-trade-form/close-trade-form'));

export function CloseTradeButton({ trade }: CloseTradeButtonProps) {
	const openModal = () => {
		modals.open({
			title: 'Закрытие сделки',
			children: (
				<Suspense fallback={null}>
					<CloseTradeForm trade={trade} />
				</Suspense>
			),
			size: 'sm',
		});
	};

	return (
		<Button onClick={openModal} size='compact-sm' variant='light'>
			Закрыть
		</Button>
	);
}
