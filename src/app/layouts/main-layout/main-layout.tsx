import { type ReactNode, useEffect, useRef } from 'react';
import {
	Outlet,
	useNavigation,
} from 'react-router';

import {
	acquireGlobalLoader,
	type GlobalLoaderToken,
	releaseGlobalLoader,
} from '@/shared/lib/global-loader';

type MainLayoutProps = { children?: ReactNode };

const NAVIGATION_LOADER_DELAY_MS = 0;

function NavigationLoaderBridge() {
	const navigation = useNavigation();
	const tokenRef = useRef<GlobalLoaderToken | null>(null);

	useEffect(() => {
		if (navigation.state !== 'idle') {
			if (!tokenRef.current) {
				tokenRef.current = acquireGlobalLoader({
					delayMs: NAVIGATION_LOADER_DELAY_MS,
				});
			}
			return;
		}

		releaseGlobalLoader(tokenRef.current);
		tokenRef.current = null;
	}, [navigation.state]);

	useEffect(() => {
		return () => {
			releaseGlobalLoader(tokenRef.current);
			tokenRef.current = null;
		};
	}, []);

	return null;
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<>
			<NavigationLoaderBridge />
			{children ?? <Outlet />}
		</>
	);
}
