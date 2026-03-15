import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, type To } from 'react-router';

type AuthFooterProps = {
	text: string;
	linkText: string;
	to: To;
};

export function AuthFooter({ text, linkText, to }: AuthFooterProps) {
	return (
		<Typography textAlign='center' variant='body2' color='text.secondary'>
			{text}

			{' '}

			<Link
				component={RouterLink}
				to={to}
				color='secondary.main'
			>
				{linkText}
			</Link>
		</Typography>
	);
}
