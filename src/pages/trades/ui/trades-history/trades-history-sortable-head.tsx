import type { ReactNode } from 'react';

import {
	Center,
	Group,
	Table,
	Text,
	UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';

type TradesHistorySortableHeadProps = {
	children: ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort: () => void;
	disabled?: boolean;
};

export function TradesHistorySortableHead({
	children,
	reversed,
	sorted,
	onSort,
	disabled,
}: TradesHistorySortableHeadProps) {
	const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

	return (
		<Table.Th>
			<UnstyledButton w='100%' onClick={onSort} disabled={disabled} opacity={disabled ? 0.5 : 1}>
				<Group justify='space-between' wrap='nowrap' gap={4}>
					<Text fw={500} size='sm'>{children}</Text>
					<Center style={{ flexShrink: 0 }}><Icon size={16} stroke={1.5} /></Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}
