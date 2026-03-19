import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export function Loader() {
	return (
		<Stack
			height={1}
			justifyContent='center'
			alignItems='center'
		>
			<CircularProgress />
		</Stack>
	);
}
