import type { ReactNode } from 'react';

import {
	Card,
	Flex,
	ThemeIcon,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import cls from './info-row.module.css';

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

	return <IconChevronRight size={18} className={cls.chevron} />;
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
		cls.root,
		isInteractive && cls.clickable,
		className,
	);

	const content = (
		<>
			<div className={cls.main}>
				<ThemeIcon
					className={cls.icon}
					radius='md'
					size={42}
				>
					{icon}
				</ThemeIcon>

				<Flex direction='column' miw={0}>
					{title}
					{description}
				</Flex>
			</div>

			{resolvedRightSection && (
				<div className={cls.end}>
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
