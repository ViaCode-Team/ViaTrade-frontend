import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { type ReactNode, useEffect } from 'react';
import {
	Outlet,
	useNavigation,
} from 'react-router';

type MainLayoutProps = { children?: ReactNode };

function NavigationProgressBridge() {
	const navigation = useNavigation();

	useEffect(() => {
		if (navigation.state !== 'idle') {
			nprogress.start();
		}
		else {
			nprogress.complete();
		}
	}, [navigation.state]);

	return null;
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<>
			<NavigationProgress color='brand' />
			<NavigationProgressBridge />
			{children ?? <Outlet />}
		</>
	);
}
