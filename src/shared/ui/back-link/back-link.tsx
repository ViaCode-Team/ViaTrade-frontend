import type { ReactNode } from 'react';
import type { To } from 'react-router';

import { IconArrowLeft } from '@tabler/icons-react';

import { AppLink } from '@/shared/ui/app-link';

import cls from './back-link.module.css';

type BackLinkProps = {
	to: To;
	children: ReactNode;
};

export function BackLink({ to, children }: BackLinkProps) {
	return (
		<AppLink to={to} className={cls.link}>
			<IconArrowLeft size={16} stroke={2} />
			{children}
		</AppLink>
	);
}
