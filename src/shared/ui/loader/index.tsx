import { Loader as MantineLoader } from '@mantine/core';

import classes from './loader.module.css';

export function Loader() {
	return (
		<div className={classes.root}>
			<MantineLoader />
		</div>
	);
}
