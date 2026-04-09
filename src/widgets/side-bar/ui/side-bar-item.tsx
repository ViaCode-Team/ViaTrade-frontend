import type { ReactNode } from 'react';

import { Flex, NavLink } from '@mantine/core';
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
			pl='md'
			h={40}
			className={!isCollapsed ? cls.link : ''}
			label={!isCollapsed && text}
			leftSection={<Flex component='span' w={22}>{icon}</Flex>}
			component={RouterLink}
			to={path}
			onClick={onClick}
			styles={{
				section: {
					marginInlineEnd: 0,
				},
			}}
		/>
	);
}
