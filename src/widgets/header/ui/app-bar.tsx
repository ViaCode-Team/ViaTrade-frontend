import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
	borderColor: (theme.vars ?? theme).palette.divider,
	borderWidth: 0,
	borderBottomWidth: 1,
	borderStyle: 'solid',
	boxShadow: 'none',
	displayPrint: 'none',
}));
