import type { ReactNode } from 'react';

import { SimpleGrid, Text, Title } from '@mantine/core';
import { IconBrandTelegram, IconMail } from '@tabler/icons-react';

import { InfoRow } from '@/shared/ui/info-row';

type ThirdPartyServicesProps = {
	email?: string;
	tgId?: string;
};

export function ThirdPartyService({ email, tgId }: ThirdPartyServicesProps) {
	return (
		<SimpleGrid minColWidth={300} spacing='sm' autoFlow='auto-fit'>
			<ThirdPartyServiceRow
				icon={<IconMail size={22} color='var(--mantine-color-brand-5)' />}
				title='Электронная почта'
				description={email ? `ID: ${email}` : 'Не привязана'}
				onClick={() => {}}
			/>

			<ThirdPartyServiceRow
				icon={<IconBrandTelegram size={22} color='var(--mantine-color-blue-4)' />}
				title='Telegram'
				description={tgId ? `ID: ${tgId}` : 'Не привязан'}
				onClick={() => {}}
			/>
		</SimpleGrid>
	);
}

type ThirdPartyServiceRowProps = {
	icon: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
};

function ThirdPartyServiceRow({
	icon,
	title,
	description,
	onClick,
}: ThirdPartyServiceRowProps) {
	return (
		<InfoRow
			icon={icon}
			title={(
				<Title order={5} lineClamp={1} style={{ overflowWrap: 'anywhere' }}>
					{title}
				</Title>
			)}
			description={(
				<Text size='sm' c='dimmed' lineClamp={2} style={{ overflowWrap: 'anywhere' }}>
					{description}
				</Text>
			)}
			onClick={onClick}
		/>
	);
}
