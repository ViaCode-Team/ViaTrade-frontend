import { Loader } from '@mantine/core';

import classes from './loader.module.css';

export function LocalLoader() {
	return (
		<Loader className={classes.root} />
	);
}
