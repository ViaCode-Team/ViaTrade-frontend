import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

const { AddTradeForm } = lazily(() => import('../add-trade-form/add-trade-form'));

export function AddTradeButton() {
	const openModal = () => {
		modals.open({
			title: 'Добавить сделку',
			children: (
				<Suspense fallback={null}>
					<AddTradeForm />
				</Suspense>
			),
			size: 'md',
		});
	};

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
