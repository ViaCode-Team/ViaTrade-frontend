import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type MenuButtonProps = {
	isExpanded: boolean;
	onToggle: () => void;
};

export function MenuButton({ isExpanded, onToggle }: MenuButtonProps) {
	const actionText = isExpanded ? 'Свернуть' : 'Расширить';

	return (
		<Tooltip title={`${actionText} меню`} enterDelay={1000}>
			<div>
				<IconButton
					size='medium'
					aria-label={`${actionText} навигационное меню`}
					onClick={onToggle}
				>
					{isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
				</IconButton>
			</div>
		</Tooltip>
	);
}
