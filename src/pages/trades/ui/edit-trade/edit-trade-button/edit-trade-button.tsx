import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';

import type { Trade } from '@/shared/api';

import { EditTradeForm } from '../edit-trade-form/edit-trade-form';

type EditTradeButtonProps = {
	trade: Trade;
};

function openModal(trade: Trade) {
	modals.open({
		title: 'Изменить сделку',
		children: <EditTradeForm trade={trade} />,
	});
}

export function EditTradeButton({ trade }: EditTradeButtonProps) {
	const handleOpenModal = () => openModal(trade);

	return (
		<Tooltip label='Изменить сделку'>
			<ActionIcon onClick={handleOpenModal} variant='subtle' aria-label='Изменить сделку'>
				<IconPencil size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
