import { Group, Text } from '@mantine/core';
import { Link as RouterLink } from 'react-router';

import logoUrl from '@/shared/assets/icons/logo-default.svg';
import { ROUTES } from '@/shared/model/routes';

type LogoProps = {
	logoWidth?: number;
	logoHeight?: number;
	fz?: number;
};

export function Logo({
	logoWidth = 32,
	logoHeight = 32,
	fz,
}: LogoProps) {
	return (
		<RouterLink to={ROUTES.HOME}>
			<Group gap={5} align='center' wrap='nowrap'>
				<img src={logoUrl} width={logoWidth} height={logoHeight} alt='logo' />

				<Text component='h2' fw='bold' fz={fz || 'lg'}>
					ViaTrade
				</Text>
			</Group>
		</RouterLink>
	);
}
