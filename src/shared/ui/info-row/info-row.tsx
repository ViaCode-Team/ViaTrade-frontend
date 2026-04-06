import type { ReactNode } from 'react';

import { Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import classes from './info-row.module.css';

type InfoRowProps = {
	icon: ReactNode;
	title: ReactNode;
	description: ReactNode;
	onClick?: () => void;
	accentIcon?: boolean;
	className?: string;
};

export function InfoRow({
	icon,
	title,
	description,
	onClick,
	accentIcon,
	className,
}: InfoRowProps) {
	const isInteractive = Boolean(onClick);
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
					<Text component='span' className={classes.title}>
						{title}
					</Text>
					<Text component='span' className={classes.description}>
						{description}
					</Text>
				</div>
			</div>

			{isInteractive && <IconChevronRight size={14} className={classes.chevron} />}
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
