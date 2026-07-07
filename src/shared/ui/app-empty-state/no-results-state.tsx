import { Button } from '@mantine/core';
import { IconSearchOff, type ReactNode } from '@tabler/icons-react';

import { AppEmptyState, type AppEmptyStateProps } from './app-empty-state';

type NoResultsStateProps
	= | (Omit<AppEmptyStateProps, 'actions'> & {
		actions?: never;
		onReset?: never;
	})
	| (Omit<AppEmptyStateProps, 'actions'> & {
		onReset: () => void;
		actions?: never;
	})
	| (AppEmptyStateProps & {
		actions: ReactNode;
		onReset?: never;
	});

export function NoResultsState({
	onReset,
	actions,
	...props
}: NoResultsStateProps) {
	return (
		<AppEmptyState
			icon={<IconSearchOff size={48} />}
			title='Ничего не найдено'
			description='По выбранным фильтрам ничего не найдено. Попробуйте изменить или сбросить параметры фильтров.'
			actions={
				actions
				?? (onReset && (
					<Button onClick={onReset}>
						Сбросить фильтры
					</Button>
				))
			}
			{...props}
		/>
	);
}
