import type { ReactNode } from 'react';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { ROUTES } from '@/shared/model/routes';

import { SideBarItem } from './side-bar-item';

type SideBarProps = {
	isCollapsed?: boolean;
};

type TMenuItem = {
	icon: ReactNode;
	text: string;
	path: string;
};

const menuItems: TMenuItem[] = [
	{
		icon: <HomeIcon />,
		text: 'Главная',
		path: '/',
	},
	{
		icon: <SignalCellularAltIcon />,
		text: 'Сигналы',
		path: '/signals',
	},
	{
		icon: <BarChartIcon />,
		text: 'Статистика',
		path: '/statistics',
	},
	{ icon: <TrendingUpIcon />, text: 'Акции', path: '/stocks' },
	{ icon: <AutoGraphIcon />, text: 'Стратегии', path: '/strategies' },
	{ icon: <NotificationsIcon />, text: 'Напоминания', path: '/reminders' },
] as const;

export function SideBar({ isCollapsed = false }: SideBarProps) {
	return (
		<Drawer
			variant='permanent'
			sx={{
				width: isCollapsed ? 56 : 200,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: isCollapsed ? 56 : 200,
					transition: 'width 0.2s ease',
					height: { sm: `calc(100vh - ${65}px)`, xs: `calc(100vh - ${49}px)` },
					top: 'auto',
				},
			}}
		>
			<List disablePadding>
				{menuItems.map((item) => (
					<SideBarItem
						key={item.text}
						icon={item.icon}
						text={item.text}
						path={item.path}
						isCollapsed={isCollapsed}
					/>
				))}
			</List>

			<List disablePadding sx={{ mt: 'auto' }}>
				<SideBarItem
					icon={<PersonIcon />}
					text='Профиль'
					path={ROUTES.PROFILE}
					isCollapsed={isCollapsed}
				/>
			</List>
		</Drawer>
	);
}
