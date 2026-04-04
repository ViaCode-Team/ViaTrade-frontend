import type { ReactNode } from 'react';

import { Link } from 'react-router';

import classes from './SideBarItem.module.css';

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
		<Link to={path} className={classes.link} onClick={onClick}>
			<span className={classes.icon}>{icon}</span>
			{!isCollapsed && <span className={classes.text}>{text}</span>}
		</Link>
	);
}
