import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { type ReactNode, useState } from 'react';
import { Outlet } from 'react-router';

import { AppHeader } from '@/widgets/header/ui/header';
import { SideBar } from '@/widgets/side-bar';

type DashboardLayoutProps = { children?: ReactNode };

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleCollapse = (isExpanded: boolean) => {
		setIsCollapsed(isExpanded);
	};

	return (
		<Stack>
			<AppHeader isMenuOpen={isCollapsed} onToggleMenu={toggleCollapse} />

			<Stack direction='row'>
				<SideBar isCollapsed={isCollapsed} />

				<Container maxWidth='xl' component='main'>
					{children ?? <Outlet />}
				</Container>
			</Stack>
		</Stack>
	);
};
