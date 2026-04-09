import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse, IconMenu2 } from '@tabler/icons-react';

type MenuButtonProps = {
	isExpanded: boolean;
	onToggle: () => void;
};

export function MenuButton({ isExpanded, onToggle }: MenuButtonProps) {
	const actionText = isExpanded ? 'Свернуть' : 'Расширить';

	return (
		<Tooltip label={`${actionText} меню`} openDelay={500}>
			<ActionIcon
				size='lg'
				variant='transparent'
				aria-label={`${actionText} навигационное меню`}
				onClick={onToggle}
				color='text'
			>
				{isExpanded ? <IconLayoutSidebarLeftCollapse size={22} /> : <IconMenu2 size={22} />}
			</ActionIcon>
		</Tooltip>
	);
}
