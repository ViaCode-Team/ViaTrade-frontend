import { modals } from '@mantine/modals';

import { AddRemind } from './add-remind';


export function openAddRemindModal() {
	modals.open({
		title: 'Новое напоминание',
		children: <AddRemind />,
		size: 'md',
	});
}
