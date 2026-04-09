import {
	ActionIcon,
	Avatar,
	Card,
	Flex,
	Group,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import {
	IconCheck,
	IconUser,
	IconX,
} from '@tabler/icons-react';

import { useGetMeSuspense } from '@/entities/user';

import { useLoginEdit } from '../../model/use-login-edit';
import { ThirdPartyService } from '../third-party-services';
import { ProfileBanner } from './profile-banner';
import cls from './profile-info.module.css';

export function ProfileInfo() {
	const { data } = useGetMeSuspense();
	const { data: user } = data;

	const loginEdit = useLoginEdit(user.login);

	return (
		<Card p={0} radius='md' className={cls.card}>
			<ProfileBanner />

			<Stack gap='sm'>
				<Stack align='center' gap='xs' mt='-53px'>
					<div className={cls.avatarRing}>
						<Avatar size={96}>
							<IconUser size={48} />
						</Avatar>
					</div>

					<Flex direction='column'>
						{loginEdit.isEditing
							? (
									<TextInput
										size='sm'
										value={loginEdit.value}
										onChange={(e) => loginEdit.setValue(e.currentTarget.value)}
										className={cls.editField}
										rightSection={(
											<Group gap={2}>
												<ActionIcon size='sm' variant='subtle' color='green' onClick={loginEdit.save}>
													<IconCheck size={14} />
												</ActionIcon>
												<ActionIcon size='sm' variant='subtle' color='red' onClick={loginEdit.cancel}>
													<IconX size={14} />
												</ActionIcon>
											</Group>
										)}
										rightSectionWidth={60}
										autoFocus
										onKeyDown={(e) => {
											if (e.key === 'Enter')
												loginEdit.save();
											if (e.key === 'Escape')
												loginEdit.cancel();
										}}
									/>
								)
							: (
									<Group gap='xs' justify='center'>
										<Text size='xl' fw={700}>
											{user.login}
										</Text>
									</Group>
								)}

						<Text c='dimmed' ta='center' size='sm'>Дата регистрации: 10.03.2026</Text>
					</Flex>
				</Stack>

				<ThirdPartyService />
			</Stack>
		</Card>
	);
}
