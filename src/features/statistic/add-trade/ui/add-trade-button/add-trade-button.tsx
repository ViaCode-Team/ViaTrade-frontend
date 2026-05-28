import { ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';

import { AddTradeForm } from '../add-trade-form/add-trade-form';

export function AddTradeButton() {
	const openModal = () => {
		modals.open({
			title: 'Добавить сделку',
			children: <AddTradeForm />,
			size: 'md',
		});
	};

	return (
		<ActionIcon onClick={openModal} variant='light' size='lg' aria-label='Добавить сделку'>
			<IconPlus size={20} />
		</ActionIcon>
	);
}
