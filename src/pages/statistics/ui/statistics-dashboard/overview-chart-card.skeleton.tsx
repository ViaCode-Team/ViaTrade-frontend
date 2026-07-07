import { Skeleton } from '@mantine/core';
import clsx from 'clsx';

import cls from './statistics-dashboard.module.css';

type OverviewChartCardSkeletonProps = {
	className?: string;
	height?: number;
};

export function OverviewChartCardSkeleton({
	className,
	height = 300,
}: OverviewChartCardSkeletonProps) {
	return (
		<Skeleton
			height={height}
			radius='md'
			className={clsx(cls.chartCard, className)}
		/>
	);
}
