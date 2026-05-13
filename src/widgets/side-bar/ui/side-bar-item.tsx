import type { ReactNode } from 'react';

import { NavLink } from '@mantine/core';
import { Link as RouterLink } from 'react-router';

import cls from './side-bar-item.module.css';

type SideBarItemProps = {
	icon: ReactNode;
	text: string;
	path: string;
	isCollapsed: boolean;
	onClick?: () => void;
};

export function SideBarItem({
	icon,
	text,
	path,
	isCollapsed,
	onClick,
}: SideBarItemProps) {
	return (
		<NavLink
			h={40}
			className={cls.link}
			classNames={{
				body: cls.body,
				label: cls.label,
				section: cls.section,
			}}
			data-collapsed={isCollapsed || undefined}
			label={text}
			leftSection={icon}
			noWrap
			component={RouterLink}
			to={path}
			onClick={onClick}
		/>
	);
}
