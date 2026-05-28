import { Card, Group, Skeleton, Table } from '@mantine/core';

export function TradesHistorySkeleton() {
	return (
		<Card withBorder radius='md' p={0} mt='md'>
			<Group p='md' pb='sm' align='flex-end' justify='space-between'>
				<Skeleton height={36} width={250} />
				<Group>
					<Skeleton height={36} width={150} />
					<Skeleton height={36} width={150} />
				</Group>
			</Group>
			<Table verticalSpacing='sm' striped>
				<Table.Thead>
					<Table.Tr>
						{Array.from({ length: 8 }).map((_, i) => (
							<Table.Th key={i}>
								<Skeleton height={20} width='80%' />
							</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{Array.from({ length: 10 }).map((_, i) => (
						<Table.Tr key={i}>
							{Array.from({ length: 8 }).map((_, j) => (
								<Table.Td key={j}>
									<Skeleton height={20} width='100%' />
								</Table.Td>
							))}
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Card>
	);
}
