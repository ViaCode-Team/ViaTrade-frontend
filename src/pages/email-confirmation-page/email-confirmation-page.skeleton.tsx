import {
	Paper,
	Skeleton,
	Stack,
} from '@mantine/core';

export function EmailConfirmationPageSkeleton() {
	return (
		<Stack gap='sm'>
			<Skeleton h={34} w={250} />

			<Paper withBorder p='lg' radius='md'>
				<Stack gap='sm'>
					<Skeleton h={30} w={30} radius='sm' />
					<Skeleton h={22} maw={560} />
					<Skeleton h={18} maw={620} />
					<Skeleton h={36} w={170} />
				</Stack>
			</Paper>
		</Stack>
	);
}
