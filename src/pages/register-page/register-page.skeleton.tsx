import { Skeleton, Stack } from '@mantine/core';

export function RegisterPageSkeleton() {
	return (
		<Stack w='100%' maw={420} align='center' gap='xl'>
			<Skeleton h={58} w={300} />

			<Stack w='100%' gap='lg'>
				<Stack gap='sm'>
					<Skeleton h={58} />
					<Skeleton h={58} />
					<Skeleton h={58} />
					<Skeleton h={58} />
				</Stack>

				<Skeleton h={42} />
				<Skeleton h={20} w={220} mx='auto' />
			</Stack>
		</Stack>
	);
}
