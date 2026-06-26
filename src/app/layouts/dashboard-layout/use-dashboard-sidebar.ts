import { useMantineTheme } from '@mantine/core';
import { useDisclosure, useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { useCallback } from 'react';

import { useLockDocumentScroll } from '@/shared/lib/hooks';
import { createStorageKey } from '@/shared/lib/storage-key';

const DESKTOP_SIDEBAR_WIDTH = {
	EXPANDED: 216,
	COLLAPSED: 54,
};
const NAVBAR_BREAKPOINT = 'xs' as const;
const DESKTOP_SIDEBAR_STORAGE_KEY = createStorageKey(
	'layout',
	'desktop_sidebar_expanded',
);

export function useDashboardSidebar() {
	const theme = useMantineTheme();
	const isDesktopViewport = useMediaQuery(
		`(min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`,
	);

	const [isMobileOpen, mobileHandlers] = useDisclosure(false);
	const [isDesktopExpanded, setIsDesktopExpanded] = useLocalStorage<boolean>({
		key: DESKTOP_SIDEBAR_STORAGE_KEY,
		defaultValue: true,
	});

	const toggleDesktopSidebar = useCallback(() => {
		setIsDesktopExpanded((isExpanded) => !isExpanded);
	}, [setIsDesktopExpanded]);

	const desktopSidebarWidth = isDesktopExpanded
		? DESKTOP_SIDEBAR_WIDTH.EXPANDED
		: DESKTOP_SIDEBAR_WIDTH.COLLAPSED;
	const shouldLockDocumentScroll = isDesktopViewport === false && isMobileOpen;

	useLockDocumentScroll(shouldLockDocumentScroll);

	return {
		isDesktopExpanded,
		isMobileOpen,
		navbar: {
			width: desktopSidebarWidth,
			breakpoint: NAVBAR_BREAKPOINT,
			collapsed: { mobile: !isMobileOpen },
		},
		closeMobileSidebar: mobileHandlers.close,
		toggleDesktopSidebar,
		toggleMobileSidebar: mobileHandlers.toggle,
	};
}
