import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse, IconMenu2 } from '@tabler/icons-react';

type MenuButtonProps = {
	isExpanded: boolean;
	onToggle: () => void;
};

export function MenuButton({ isExpanded, onToggle }: MenuButtonProps) {
	const actionText = isExpanded ? 'Свернуть' : 'Расширить';

	return (
		<Tooltip label={`${actionText} меню`} openDelay={1000}>
			<ActionIcon
				size='lg'
				variant='subtle'
				aria-label={`${actionText} навигационное меню`}
				onClick={onToggle}
			>
				{isExpanded ? <IconLayoutSidebarLeftCollapse size={22} /> : <IconMenu2 size={22} />}
			</ActionIcon>
		</Tooltip>
	);
}
