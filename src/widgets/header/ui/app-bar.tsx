import type { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

import cls from './app-bar.module.css';

type AppBarProps = ComponentPropsWithoutRef<'header'>;

export function AppBar({ children, className, ...props }: AppBarProps) {
	return (
		<header className={clsx(cls.root, className)} {...props}>
			{children}
		</header>
	);
}
