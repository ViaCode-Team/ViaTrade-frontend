import type { ReactNode } from 'react';

import { Flex } from '@mantine/core';
import {
	IconBell,
	IconChartBar,
	IconChartCandle,
	IconChartLine,
	IconHome,
	IconNotebook,
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
	{ icon: <IconTrendingUp size={22} />, text: 'Акции', path: ROUTES.STOCKS },
	{ icon: <IconChartLine size={22} />, text: 'Стратегии', path: ROUTES.STRATEGIES },
	{ icon: <IconNotebook size={22} />, text: 'Заметки', path: ROUTES.NOTES },
	{ icon: <IconBell size={22} />, text: 'Напоминания', path: '/reminders' },
] as const;

export function SideBar({ isCollapsed = false, mobileOpen, onClose }: SideBarProps) {
	const isCompact = isCollapsed && !mobileOpen;

	return (
		<Flex direction='column' h='100%' gap={4}>
			<Flex direction='column' gap={4}>
				{menuItems.map((item) => (
					<SideBarItem
						key={item.text}
						icon={item.icon}
						text={item.text}
						path={item.path}
						isCollapsed={isCompact}
						onClick={mobileOpen ? onClose : undefined}
					/>
				))}
			</Flex>

			<div className={cls.bottom}>
				<SideBarItem
					icon={<IconUser size={22} />}
					text='Профиль'
					path={ROUTES.PROFILE}
					isCollapsed={isCompact}
					onClick={mobileOpen ? onClose : undefined}
				/>
			</div>
		</Flex>
	);
}
