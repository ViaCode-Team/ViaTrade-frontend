import { ActionIcon, Burger, Tooltip } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

import { milliseconds } from '@/shared/lib/milliseconds';

type MenuButtonProps = {
	isDesktopExpanded: boolean;
	isMobileOpen: boolean;
	onDesktopToggle: () => void;
	onMobileToggle: () => void;
};

export function MenuButton({
	isDesktopExpanded,
	isMobileOpen,
	onDesktopToggle,
	onMobileToggle,
}: MenuButtonProps) {
	const desktopActionText = isDesktopExpanded ? 'Свернуть' : 'Развернуть';

	return (
		<>
			<Tooltip label={`${desktopActionText} меню`} openDelay={milliseconds.fromMilliseconds(500)}>
				<ActionIcon
					visibleFrom='xs'
					size='lg'
					variant='transparent'
					style={{ color: 'var(--mantine-color-text)' }}
					aria-label={`${desktopActionText} боковое меню`}
					onClick={onDesktopToggle}
				>
					{isDesktopExpanded
						? <IconLayoutSidebarLeftCollapse size={22} />
						: <IconLayoutSidebarLeftExpand size={22} />}
				</ActionIcon>
			</Tooltip>

			<Burger
				hiddenFrom='xs'
				opened={isMobileOpen}
				onClick={onMobileToggle}
				aria-label={isMobileOpen ? 'Закрыть боковое меню' : 'Открыть боковое меню'}
				size='sm'
			/>
		</>
	);
}
