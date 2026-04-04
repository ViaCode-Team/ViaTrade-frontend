import { Group, Text } from '@mantine/core';
import { Link } from 'react-router';

import LogoIcon from '@/shared/assets/icons/logo-default.svg?react';

type LogoProps = {
	logoWidth: number;
	logoHeight: number;
	variantText?: 'h6' | 'h5';
};

export function Logo({
	logoWidth,
	logoHeight,
	variantText = 'h6',
}: LogoProps) {
	return (
		<Link to='/'>
			<Group gap={5} align='center' wrap='nowrap'>
				<LogoIcon width={logoWidth} height={logoHeight} />

				<Text
					component='h2'
					fw='bold'
					fz={variantText === 'h5' ? 'xl' : 'lg'}
					lh={1}
					style={{ whiteSpace: 'nowrap', margin: 0 }}
				>
					ViaTrade
				</Text>
			</Group>
		</Link>
	);
}
