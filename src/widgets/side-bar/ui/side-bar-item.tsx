import type { ReactNode } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';

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
		<ListItem disablePadding>
			<ListItemButton
				component={Link}
				to={path}
				sx={{ height: 45, display: 'flex', gap: 2 }}
				onClick={onClick}
			>
				<ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
				{!isCollapsed && <ListItemText primary={text} />}
			</ListItemButton>
		</ListItem>
	);
}
