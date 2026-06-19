import { Flex, Text } from '@mantine/core';
import dayjs from 'dayjs';

import cls from './session-list-item.module.css';

type SessionMetaProps = {
	createdAt: Date | string;
	lastSeen: Date | string;
};

const SESSION_DATE_FORMAT = 'DD.MM.YYYY, HH:mm';

function formatSessionDate(date: Date | string) {
	return dayjs(date).format(SESSION_DATE_FORMAT);
}

export function SessionMeta({ createdAt, lastSeen }: SessionMetaProps) {
	return (
		<Flex className={cls.sessionMeta}>
			<Text size='sm' c='dimmed'>
				Создана:
				{' '}
				{formatSessionDate(createdAt)}
			</Text>

			<Text size='sm' c='dimmed'>
				Активность:
				{' '}
				{formatSessionDate(lastSeen)}
			</Text>
		</Flex>
	);
}
