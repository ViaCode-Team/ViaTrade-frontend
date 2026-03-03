import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

import LogoIcon from '@/shared/assets/icons/logo-default.svg?react';

type LogoProps = {
	logoWidth: number;
	logoHeight: number;
	variantText?: 'h6' | 'h5';
};

export const Logo = ({
	logoWidth,
	logoHeight,
	variantText = 'h6',
}: LogoProps) => (
	<Link to='/'>
		<Stack direction='row' alignItems='center' gap='5px'>
			<LogoIcon width={logoWidth} height={logoHeight} />

			<Typography
				variant={variantText}
				component='h2'
				fontWeight='bold'
				sx={{
					whiteSpace: 'nowrap',
					lineHeight: 1,
				}}
			>
				ViaTrade
			</Typography>
		</Stack>
	</Link>
);
