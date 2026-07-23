import { Skeleton, Text, Title } from '@mantine/core';
import { IconBrandTelegram } from '@tabler/icons-react';

import { useGenerateTelegramToken, useGetMeSuspense } from '@/entities/user';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';
import { InfoRow } from '@/shared/ui/info-row';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export function TelegramService() {
	const { data: meRes } = useGetMeSuspense();
	const tgId = meRes.data.telegramId;

	const { data: tokenRes } = useGenerateTelegramToken({
		query: {
			enabled: !tgId,
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
	});

	const token = tokenRes?.data?.telegramToken;

	let link = 'https://t.me/ViaTradeBot';
	let description = 'Не привязан';

	if (tgId) {
		description = `Привязан к ID: ${tgId}`;
	}
	else if (token) {
		const extractedToken = token.split('start=').pop();
		link = `https://t.me/ViaTradeBot?start=${extractedToken}`;
	}

	const onClick = () => {
		window.open(link, '_blank', 'noopener,noreferrer');
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
