import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import type { Trade } from '@/shared/api';

type EditTradeButtonProps = {
	trade: Trade;
};

const { EditTradeForm } = lazily(() => import('../edit-trade-form/edit-trade-form'));

export function EditTradeButton({ trade }: EditTradeButtonProps) {
	const openModal = () => {
		modals.open({
			title: 'Изменить сделку',
			children: (
				<Suspense fallback={null}>
					<EditTradeForm trade={trade} />
				</Suspense>
			),
			size: 'md',
		});
	};

	return (
		<Tooltip label='Изменить сделку'>
			<ActionIcon onClick={openModal} variant='subtle' aria-label='Изменить сделку'>
				<IconPencil size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
