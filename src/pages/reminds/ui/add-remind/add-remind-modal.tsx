import { modals } from '@mantine/modals';
import { lazily } from 'react-lazily';

import { withQueryBoundary } from '@/shared/ui/queryBoundary';

const { AddRemind } = lazily(() => import('./add-remind'));

// eslint-disable-next-line react-refresh/only-export-components
const AddRemindBoundary = withQueryBoundary(AddRemind);

export function openAddRemindModal() {
	modals.open({
		title: 'Выбор актива',
		children: <AddRemindBoundary />,
		size: 'md',
	});
}
