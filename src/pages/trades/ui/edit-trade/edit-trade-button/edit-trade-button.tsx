import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';

import type { TradeResponse } from '@/shared/api';

import { EditTradeForm } from '../edit-trade-form/edit-trade-form';

type EditTradeButtonProps = {
	trade: TradeResponse;
};

function openEditTradeModal(trade: TradeResponse) {
	modals.open({
		title: 'Редактировать сделку',
		children: <EditTradeForm trade={trade} />,
	});
}

export function EditTradeButton({ trade }: EditTradeButtonProps) {
	const handleOpenEditTradeModal = () => openEditTradeModal(trade);

	return (
		<Tooltip label='Редактировать сделку'>
			<ActionIcon onClick={handleOpenEditTradeModal} variant='subtle' aria-label='Редактировать сделку'>
				<IconPencil size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
