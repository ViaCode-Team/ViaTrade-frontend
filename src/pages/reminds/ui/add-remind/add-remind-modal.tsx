import { modals } from '@mantine/modals';

import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { AddRemind } from '.';

// eslint-disable-next-line react-refresh/only-export-components
const AddRemindBoundary = withQueryBoundary(AddRemind);

export function openAddRemindModal() {
	modals.open({
		title: 'Выбор актива',
		children: <AddRemindBoundary />,
		size: 'md',
	});
}
