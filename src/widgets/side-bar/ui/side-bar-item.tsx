import type { ReactNode } from 'react';

import { Link } from 'react-router';

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
		<Link to={path} className={cls.link} onClick={onClick}>
			<span className={cls.icon}>{icon}</span>
			{!isCollapsed && <span className={cls.text}>{text}</span>}
		</Link>
	);
}
