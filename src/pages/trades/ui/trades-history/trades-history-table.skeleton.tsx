import { ScrollArea, Skeleton, Table } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';

export function TradesHistoryTableSkeleton() {
	return (
		<ScrollArea>
			<Table verticalSpacing='sm' striped miw={800}>
				<Table.Thead>
					<Table.Tr>
						{createSkeletons(10).map((skel) => (
							<Table.Th key={skel.id}>
								<Skeleton height={20} width='80%' />
							</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{createSkeletons(10).map((rowSkel) => (
						<Table.Tr key={rowSkel.id}>
							{createSkeletons(10).map((cellSkel) => (
								<Table.Td key={cellSkel.id}>
									<Skeleton height={20} width='100%' />
								</Table.Td>
							))}
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</ScrollArea>
	);
}
