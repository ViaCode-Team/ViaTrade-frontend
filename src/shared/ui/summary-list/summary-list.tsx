import type { ReactNode } from 'react';

import cls from './summary-list.module.css';

export type SummaryListProps = {
	children: ReactNode;
};

export function SummaryList({ children }: SummaryListProps) {
	return (
		<div className={cls.list}>
			{children}
		</div>
	);
}
