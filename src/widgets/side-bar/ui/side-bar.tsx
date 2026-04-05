import type { ReactNode } from 'react';

import {
	IconBell,
	IconChartBar,
	IconChartCandle,
	IconChartLine,
	IconHome,
	IconTrendingUp,
	IconUser,
} from '@tabler/icons-react';

import { ROUTES } from '@/shared/model/routes';

import { SideBarItem } from './side-bar-item';
import classes from './side-bar.module.css';

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
		icon: <IconHome size={22} />,
		text: 'Главная',
		path: '/',
	},
	{
		icon: <IconChartCandle size={22} />,
		text: 'Сигналы',
		path: '/signals',
	},
	{
		icon: <IconChartBar size={22} />,
		text: 'Статистика',
		path: '/statistics',
	},
	{ icon: <IconTrendingUp size={22} />, text: 'Акции', path: '/stocks' },
	{ icon: <IconChartLine size={22} />, text: 'Стратегии', path: '/strategies' },
	{ icon: <IconBell size={22} />, text: 'Напоминания', path: '/reminders' },
] as const;

export function SideBar({ isCollapsed = false }: SideBarProps) {
	return (
		<nav
			className={classes.root}
			style={{ width: isCollapsed ? 56 : 200 }}
		>
			<div className={classes.list}>
				{menuItems.map((item) => (
					<SideBarItem
						key={item.text}
						icon={item.icon}
						text={item.text}
						path={item.path}
						isCollapsed={isCollapsed}
					/>
				))}
			</div>

			<div className={classes.bottom}>
				<SideBarItem
					icon={<IconUser size={22} />}
					text='Профиль'
					path={ROUTES.PROFILE}
					isCollapsed={isCollapsed}
				/>
			</div>
		</nav>
	);
}
