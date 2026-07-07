import { modals } from '@mantine/modals';

import { AddRemind } from './add-remind';


export function openAddRemindModal() {
	modals.open({
		title: 'Выбор актива',
		children: <AddRemind />,
		size: 'md',
	});
}
