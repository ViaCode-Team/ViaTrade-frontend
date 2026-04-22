import { Flex } from '@mantine/core';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

export function PureHeader() {
	return (
		<Flex justify='space-between' px='sm' py='xs'>
			<Logo />

			<ThemeSwitcher />
		</Flex>
	);
}
