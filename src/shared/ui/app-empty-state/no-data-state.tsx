import { IconDatabaseOff } from '@tabler/icons-react';

import { AppEmptyState, type AppEmptyStateProps } from './app-empty-state';

type NoDataStateProps = AppEmptyStateProps;

export function NoDataState({ ...props }: NoDataStateProps) {
	return (
		<AppEmptyState
			icon={<IconDatabaseOff size={48} />}
			title='Нет данных'
			description='Здесь пока ничего нет. Данные появятся после добавления новых записей.'
			{...props}
		/>
	);
}
