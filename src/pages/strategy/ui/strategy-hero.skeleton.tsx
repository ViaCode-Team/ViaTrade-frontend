import { Grid, Skeleton } from '@mantine/core';

export function StrategyHeroSkeleton() {
	return (
		<Grid
			gap='lg'
			type='container'
			breakpoints={{
				xs: '36em',
				sm: '48em',
				md: '62em',
				lg: '75em',
				xl: '88em',
			}}
		>
			<Grid.Col span={{ base: 12, md: 6 }}>
				<Skeleton h={180} radius='md' />
			</Grid.Col>

			<Grid.Col span={{ base: 12, md: 6 }}>
				<Skeleton h={180} radius='md' />
			</Grid.Col>
		</Grid>
	);
}
