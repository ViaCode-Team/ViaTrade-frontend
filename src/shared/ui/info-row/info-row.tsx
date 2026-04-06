import type { ReactNode } from 'react';

import { UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import classes from './info-row.module.css';

type InfoRowProps = {
	icon: ReactNode;
	title: ReactNode;
	description: ReactNode;
	rightSection?: ReactNode;
	onClick?: () => void;
	accentIcon?: boolean;
	className?: string;
};

export function InfoRow({
	icon,
	title,
	description,
	rightSection,
	onClick,
	accentIcon,
	className,
}: InfoRowProps) {
	const isInteractive = Boolean(onClick);
	const resolvedRightSection = rightSection ?? (isInteractive
		? <IconChevronRight size={14} className={classes.chevron} />
		: null);
	const rootClassName = clsx(
		classes.root,
		isInteractive && classes.clickable,
		className,
	);

	const content = (
		<>
			<div className={classes.main}>
				<div className={clsx(classes.icon, accentIcon && classes.iconAccent)}>
					{icon}
				</div>

				<div className={classes.content}>
					<div className={classes.title}>
						{title}
					</div>
					<div className={classes.description}>
						{description}
					</div>
				</div>
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
			<UnstyledButton type='button' className={rootClassName} onClick={onClick}>
				{content}
			</UnstyledButton>
		);
	}

	return <div className={rootClassName}>{content}</div>;
}
