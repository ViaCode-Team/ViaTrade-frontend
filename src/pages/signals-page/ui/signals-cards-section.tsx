import type { ReactNode } from 'react';

import { Group, SimpleGrid, Text, Title } from '@mantine/core';

import type { Signal } from '@/entities/signal';

import { SignalCard } from '@/entities/signal';

type SignalsCardsSectionProps = {
	title: string;
	icon: ReactNode;
	signals: Signal[];
	marginTop?: string;
	onSignalSelect: (signal: Signal) => void;
};

export function SignalsCardsSection({
	title,
	icon,
	signals,
	marginTop = 'lg',
	onSignalSelect,
}: SignalsCardsSectionProps) {
	if (signals.length === 0)
		return null;

	return (
		<>
			<Title order={4} mt={marginTop} mb='sm'>
				<Group gap='xs'>
					{icon}
					{title}
					<Text size='xs' c='dimmed' ml='xs'>
						(
						{signals.length}
						)
					</Text>
				</Group>
			</Title>
			<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='lg'>
				{signals.map((signal) => (
					<SignalCard key={signal.id} signal={signal} onClick={onSignalSelect} />
				))}
			</SimpleGrid>
		</>
	);
}
