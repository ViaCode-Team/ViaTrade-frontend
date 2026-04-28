import type { ReactNode } from 'react';

import { SimpleGrid, Text } from '@mantine/core';
import { IconBrandTelegram, IconMail } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import { InfoRow } from '@/shared/ui/info-row';

type ThirdPartyServicesProps = {
	email?: string;
	tgId?: string;
};

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
				<Text size='sm' fw={700} lh={1.2}>
					{title}
				</Text>
			)}
			description={(
				<Text size='xs' c='dimmed' lineClamp={2} style={{ overflowWrap: 'anywhere' }}>
					{description}
				</Text>
			)}
			onClick={onClick}
		/>
	);
}

export function ThirdPartyService({ email, tgId }: ThirdPartyServicesProps) {
	const navigate = useNavigate();

	return (
		<SimpleGrid minColWidth={300} spacing='sm' autoFlow='auto-fit'>
			<ThirdPartyServiceRow
				icon={<IconMail size={22} color='var(--mantine-color-brand-5)' />}
				title='Электронная почта'
				description={email ? `ID: ${email}` : 'Не подтверждена'}
				onClick={() => navigate(ROUTES.EMAIL_CONFIRMATION)}
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
