import { Group, Text } from '@mantine/core';
import { Link as RouterLink } from 'react-router';

import logoUrl from '@/shared/assets/icons/logo-default.svg';
import { ROUTES } from '@/shared/model';

import cls from './logo.module.css';

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
		<RouterLink to={ROUTES.LANDING} className={cls.link}>
			<Group gap={5} align='center' wrap='nowrap'>
				<img src={logoUrl} width={logoWidth} height={logoHeight} alt='logo' />

				<Text component='h2' fw='bold' fz={fz || 'lg'} className={cls.text}>
					ViaTrade
				</Text>
			</Group>
		</RouterLink>
	);
}
