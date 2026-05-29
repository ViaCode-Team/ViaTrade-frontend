import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';

import type { Trade } from '@/shared/api/types/gen/trade';

import { EditTradeForm } from '../edit-trade-form/edit-trade-form';

type EditTradeButtonProps = {
	trade: Trade;
};

export function EditTradeButton({ trade }: EditTradeButtonProps) {
	const openModal = () => {
		modals.open({
			title: 'Изменить сделку',
			children: <EditTradeForm trade={trade} />,
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
