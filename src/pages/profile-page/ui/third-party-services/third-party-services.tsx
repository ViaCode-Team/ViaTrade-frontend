import { SimpleGrid } from '@mantine/core';
import { IconBrandTelegram, IconMail } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import { InfoRow } from '@/shared/ui/info-row';

type ThirdPartyServicesProps = {
	email?: string;
	tgId?: string;
};

export function ThirdPartyService({ email, tgId }: ThirdPartyServicesProps) {
	const navigate = useNavigate();

	return (
		<SimpleGrid minColWidth={300} spacing='sm' autoFlow='auto-fit'>
			<InfoRow
				icon={<IconMail size={22} color='var(--mantine-color-brand-5)' />}
				title='Электронная почта'
				description={email ? `ID: ${email}` : 'Не подтверждена'}
				onClick={() => navigate(ROUTES.EMAIL_CONFIRMATION)}
			/>

			<InfoRow
				icon={<IconBrandTelegram size={22} color='var(--mantine-color-blue-4)' />}
				title='Telegram'
				description={tgId ? `ID: ${tgId}` : 'Не привязан'}
				onClick={() => {}}
			/>
		</SimpleGrid>
	);
}
