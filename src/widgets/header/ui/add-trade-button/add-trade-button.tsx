import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';

import { AddTradeForm } from '../add-trade-form/add-trade-form';

function openModal() {
	modals.open({
		title: 'Добавить сделку',
		children: <AddTradeForm />,
	});
}

export function AddTradeButton() {
	return (
		<>
			<Button
				onClick={openModal}
				variant='light'
				leftSection={<IconPlus size={20} />}
				visibleFrom='sm'
			>
				Добавить сделку
			</Button>

			<Tooltip label='Добавить сделку'>
				<ActionIcon
					onClick={openModal}
					variant='light'
					size='lg'
					aria-label='Добавить сделку'
					hiddenFrom='sm'
				>
					<IconPlus size={20} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
