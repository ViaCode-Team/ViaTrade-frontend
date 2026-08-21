import { modals } from '@mantine/modals';

import type { CreateRemindInstrument } from '../model/remind-instrument';

import { CreateRemindForm } from './create-remind-form';

export function openCreateRemindModal(instrument?: CreateRemindInstrument) {
	modals.open({
		title: 'Новое напоминание',
		children: <CreateRemindForm instrument={instrument} />,
		size: 'md',
	});
}
