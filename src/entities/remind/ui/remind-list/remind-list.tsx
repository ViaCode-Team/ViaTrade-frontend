import type { ReactNode } from 'react';

import { SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';

import type { RemindItem } from '../../model';

import { RemindCard } from '../remind-card/remind-card';
import cls from './remind-list.module.css';

export type RemindListProps = {
	reminds: RemindItem[];
	hideSourceBadge?: boolean;
	onRemindChange: (
		remindId: string,
		updates: { text: string; date: string; time: string },
		onSuccess?: () => void,
	) => void;
	renderAction?: (remind: RemindItem) => ReactNode;
};

export function RemindList({
	reminds,
	hideSourceBadge,
	onRemindChange,
	renderAction,
}: RemindListProps) {
	return (
		<div className={cls.container}>
			<SimpleGrid
				className={cls.grid}
				minColWidth='var(--list-min-col-width)'
				spacing={CONTENT_GRID_SPACING}
				autoFlow='auto-fit'
				component='ul'
			>
				{reminds.map((remind) => (
					<li key={remind.id}>
						<RemindCard
							remind={remind}
							onRemindChange={onRemindChange}
							action={renderAction?.(remind)}
							hideSourceBadge={hideSourceBadge}
						/>
					</li>
				))}
			</SimpleGrid>
		</div>
	);
}
