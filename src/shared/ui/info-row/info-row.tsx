import type { ReactNode } from 'react';

import { Box, Card, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import classes from './info-row.module.css';

type InfoRowProps = {
	icon: ReactNode;
	title: ReactNode;
	description: ReactNode;
	rightSection?: ReactNode;
	onClick?: () => void;
	className?: string;
};

function resolveRightSection(
	rightSection: ReactNode | undefined,
	isInteractive: boolean,
): ReactNode {
	if (rightSection != null) {
		return rightSection;
	}

	if (!isInteractive) {
		return null;
	}

	return <IconChevronRight size={14} className={classes.chevron} />;
}

export function InfoRow({
	icon,
	title,
	description,
	rightSection,
	onClick,
	className,
}: InfoRowProps) {
	const isInteractive = Boolean(onClick);
	const resolvedRightSection = resolveRightSection(rightSection, isInteractive);
	const rootClassName = clsx(
		classes.root,
		isInteractive && classes.clickable,
		className,
	);

	const content = (
		<>
			<div className={classes.main}>
				<Box h={42} w={42} className={classes.icon}>
					{icon}
				</Box>

				<Stack gap='2px'>
					<div className={classes.title}>
						{title}
					</div>
					<div className={classes.description}>
						{description}
					</div>
				</Stack>
			</div>

			{resolvedRightSection && (
				<div className={classes.end}>
					{resolvedRightSection}
				</div>
			)}
		</>
	);

	if (isInteractive) {
		return (
			<Card
				component='button'
				type='button'
				orientation='horizontal'
				className={rootClassName}
				onClick={onClick}
				withBorder

			>
				{content}
			</Card>
		);
	}

	return (
		<Card
			orientation='horizontal'
			className={rootClassName}
			withBorder
		>
			{content}
		</Card>
	);
}
