import { Flex, Skeleton, Stack } from '@mantine/core';

export function NoteCardSkeleton() {
	return (
		<section>
			<Stack flex={1} gap='md'>
				<Flex justify='space-between' align='flex-start'>
					<Stack gap={2} flex={1}>
						<Skeleton height={20} width='60%' />
						<Flex gap={4}>
							<Skeleton height={16} width={50} radius='xl' />
							<Skeleton height={18} width={80} />
						</Flex>
					</Stack>
					<Skeleton height={22} width={22} radius='sm' />
				</Flex>

				<Skeleton height={104} radius='sm' />
			</Stack>
		</section>
	);
}
