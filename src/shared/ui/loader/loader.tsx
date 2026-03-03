import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export const Loader = () => {
	return (
		<Stack
			sx={{ height: '100%' }}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<CircularProgress />
		</Stack>
	);
};
