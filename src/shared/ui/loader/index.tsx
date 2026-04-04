import { Loader as MantineLoader } from '@mantine/core';

import classes from './Loader.module.css';

export function Loader() {
	return (
		<div className={classes.root}>
			<MantineLoader />
		</div>
	);
}
