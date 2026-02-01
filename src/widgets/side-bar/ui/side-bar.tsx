import type { ReactNode } from 'react';
import {
	AutoGraph as AutoGraphIcon,
	BarChart as BarChartIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Home as HomeIcon,
	Notifications as NotificationsIcon,
	SignalCellularAlt as SignalCellularAltIcon,
	TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
	Divider,
	Drawer,
	IconButton,
	List,
	Stack,
	Typography,
} from '@mui/material';
import { SideBarItem } from './side-bar-item';

type SideBarProps = {
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
};

const LogoIcon = () => (
	<svg
		width='34'
		height='34'
		viewBox='0 0 160 160'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M25.25 113.625L0 138.37V67.3333H25.25M67.3333 98.1383L54.1192 86.86L42.0833 97.97V33.6667H67.3333M109.417 84.1667L84.1667 109.417V0H109.417M133.067 82.5675L117.833 67.3333H159.917V109.417L144.851 94.3508L84.1667 154.53L54.9608 129.112L23.1458 159.917H0L54.4558 106.555L84.1667 131.637'
			fill='url(#paint0_linear_1_31)'
		/>
		<defs>
			<linearGradient
				id='paint0_linear_1_31'
				x1='155.25'
				y1='47.25'
				x2='-94.5'
				y2='232.5'
				gradientUnits='userSpaceOnUse'
			>
				<stop stop-color='#F4B349' />
				<stop offset='1' stop-color='#FFC362' stop-opacity='0.5' />
			</linearGradient>
		</defs>
	</svg>
);

type TMenuItem = {
	icon: ReactNode;
	text: string;
	path: string;
};

const menuItems: TMenuItem[] = [
	{ icon: <HomeIcon />, text: 'Главная', path: '/' },
	{ icon: <SignalCellularAltIcon />, text: 'Сигналы', path: '/signals' },
	{ icon: <BarChartIcon />, text: 'Статистика', path: '/statistics' },
	{ icon: <TrendingUpIcon />, text: 'Акции', path: '/stocks' },
	{ icon: <AutoGraphIcon />, text: 'Стратегии', path: '/strategies' },
	{ icon: <NotificationsIcon />, text: 'Напоминания', path: '/reminders' },
];

export const SideBar = ({
	isCollapsed = false,
	onToggleCollapse,
}: SideBarProps) => {
	return (
		<Drawer
			variant='permanent'
			sx={{
				width: isCollapsed ? 56 : 200,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: isCollapsed ? 56 : 200,
					transition: 'width 0.2s ease',
				},
			}}
		>
			<Stack
				direction='row'
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					padding: '8px 0',
				}}
				gap={1}
			>
				<LogoIcon />
				{!isCollapsed && (
					<Typography variant='h6' component='h3'>
						ViaTrade
					</Typography>
				)}
			</Stack>

			<Divider />

			<List
				disablePadding
				// sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
			>
				{menuItems.map((item) => (
					<SideBarItem
						key={item.text}
						icon={item.icon}
						text={item.text}
						isCollapsed={isCollapsed}
					/>
				))}
			</List>

			<IconButton
				onClick={onToggleCollapse}
				centerRipple
				sx={{ width: 12 }}
				disableRipple
			>
				{isCollapsed ? (
					<ChevronRightIcon />
				) : (
					<ChevronLeftIcon sx={{ justifySelf: 'flex-end' }} />
				)}
			</IconButton>
		</Drawer>
	);
};
