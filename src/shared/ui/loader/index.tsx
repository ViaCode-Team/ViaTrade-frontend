import { Loader } from '@mantine/core';

import cls from './loader.module.css';

export function LocalLoader() {
	return (
		<Loader className={cls.root} />
	);
}
