import { Skeleton, Text, Title } from '@mantine/core';
import { IconBrandTelegram } from '@tabler/icons-react';

import { useGenerateTelegramToken, useGetMeSuspense } from '@/entities/user';
import { InfoRow } from '@/shared/ui/info-row';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export function TelegramService() {
	const { data: meRes } = useGetMeSuspense();
	const tgId = meRes.data.telegramId;

	const { mutate: generateToken } = useGenerateTelegramToken();
	const description = tgId
		? `Привязан к ID: ${tgId}`
		: 'Нажмите, чтобы привязать Telegram';

	const onClick = () => {
		if (tgId) {
			window.open('https://t.me/ViaTradeBot', '_blank', 'noopener,noreferrer');
			return;
		}

		generateToken(undefined, {
			onSuccess: (response) => {
				const token = response.data.telegramToken.split('start=').pop();
				window.open(`https://t.me/ViaTradeBot?start=${token}`, '_blank', 'noopener,noreferrer');
			},
		});
	};

	return (
		<InfoRow
			icon={<IconBrandTelegram size={22} color='var(--mantine-color-blue-4)' />}
			title={(
				<Title order={5} lineClamp={1} style={{ overflowWrap: 'anywhere' }}>
					Telegram
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

export const TelegramServiceBoundary = withQueryBoundary(TelegramService, {
	suspenseProps: {
		fallback: <Skeleton height={74} radius='md' />,
	},
});
