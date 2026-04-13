import { ActionIcon, Burger, Tooltip } from '@mantine/core';
import {
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarLeftExpand,
} from '@tabler/icons-react';

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
			<Tooltip label={`${desktopActionText} меню`} openDelay={500}>
				<ActionIcon
					visibleFrom='xs'
					size='lg'
					variant='transparent'
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
