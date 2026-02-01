import type { ReactNode } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';

type SideBarItemProps = {
	icon: ReactNode;
	text: string;
	isCollapsed: boolean;
	onClick?: () => void;
};

export const SideBarItem = ({
	icon,
	text,
	isCollapsed,
	onClick,
}: SideBarItemProps) => {
	return (
		<ListItem disablePadding>
			<ListItemButton
				sx={{ height: 45, display: 'flex', gap: 2 }}
				onClick={onClick}
				LinkComponent={Link}
			>
				<ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
				{!isCollapsed && <ListItemText primary={text} />}
			</ListItemButton>
		</ListItem>
	);
};
