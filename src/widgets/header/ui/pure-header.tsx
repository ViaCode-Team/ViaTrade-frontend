import { Group, Text } from '@mantine/core';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AppBar } from './app-bar';
import cls from './pure-header.module.css';

type PureHeaderProps = {
	title?: string;
};

export function PureHeader({ title }: PureHeaderProps) {
	return (
		<AppBar>
			<div className={cls.toolbar}>
				<Group flex={1}>
					<Logo logoWidth={32} logoHeight={32} />
				</Group>

				<Text size='lg' component='h2' className={cls.title}>
					{title}
				</Text>

				<Group flex={1} justify='flex-end' gap='sm'>
					<ThemeSwitcher />
				</Group>
			</div>
		</AppBar>
	);
}
