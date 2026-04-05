import type { ComponentPropsWithoutRef } from 'react';

import classes from './app-bar.module.css';

type AppBarProps = ComponentPropsWithoutRef<'header'>;

export function AppBar({ children, className, ...props }: AppBarProps) {
	return (
		<header className={`${classes.root} ${className ?? ''}`} {...props}>
			{children}
		</header>
	);
}
