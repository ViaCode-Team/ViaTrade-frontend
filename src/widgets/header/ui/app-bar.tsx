import type { ComponentPropsWithoutRef } from 'react';

import cls from './app-bar.module.css';

type AppBarProps = ComponentPropsWithoutRef<'header'>;

export function AppBar({ children, className, ...props }: AppBarProps) {
	return (
		<header className={`${cls.root} ${className ?? ''}`} {...props}>
			{children}
		</header>
	);
}
