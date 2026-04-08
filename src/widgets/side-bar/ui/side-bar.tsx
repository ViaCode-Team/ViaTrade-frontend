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
import cls from './side-bar.module.css';

type SideBarProps = {
	isCollapsed?: boolean;
	mobileOpen?: boolean;
	onClose?: () => void;
};

type TMenuItem = {
	icon: ReactNode;
	text: string;
	path: string;
};

const SIDEBAR_COLLAPSED_WIDTH = 56;
const SIDEBAR_EXPANDED_WIDTH = 200;

const menuItems: TMenuItem[] = [
	{
		icon: <IconHome size={22} />,
		text: 'Главная',
		path: ROUTES.HOME,
	},
	{
		icon: <IconChartCandle size={22} />,
		text: 'Сигналы',
		path: ROUTES.SIGNALS,
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

export function SideBar({ isCollapsed = false, mobileOpen, onClose }: SideBarProps) {
	return (
		<>
			{mobileOpen && (
				<div
					className={cls.backdrop}
					onClick={onClose}
				/>
			)}
			<nav
				className={cls.root}
				data-mobile-open={mobileOpen || undefined}
				style={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
			>
				<div className={cls.list}>
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

				<div className={cls.bottom}>
					<SideBarItem
						icon={<IconUser size={22} />}
						text='Профиль'
						path={ROUTES.PROFILE}
						isCollapsed={isCollapsed}
					/>
				</div>
			</nav>
		</>
	);
}
