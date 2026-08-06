import type { ReactNode } from 'react';

import {
	Center,
	Container,
	Group,
	Paper,
	PinInput,
	Stack,
	Text,
	Title,
} from '@mantine/core';

import { Logo } from '@/shared/ui/logo';

import { usePinUnlock } from '../model/use-pin-unlock';

type PinUnlockProps = {
	actionSlot?: ReactNode;
};

export function PinUnlock({ actionSlot }: PinUnlockProps) {
	const {
		pin,
		error,
		isLoading,
		isLockedOut,
		handleChange,
		handleComplete,
	} = usePinUnlock();

	return (
		<Center style={{ width: '100vw', height: '100vh', position: 'relative' }}>
			<div style={{ position: 'absolute', top: 32, left: 32 }}>
				<Logo />
			</div>

			<Container size='xs' style={{ width: '100%', maxWidth: '400px' }}>
				<Paper p='xl' withBorder style={{ position: 'relative' }}>
					{actionSlot}

					<Title order={2} ta='center' mt='md' mb='xs'>
						С возвращением
					</Title>

					<Text c='dimmed' size='sm' ta='center' mb='xl'>
						Чтобы защитить ваши данные на данном устройстве, приложение заблокировано. Введите ПИН-код, чтобы продолжить.
					</Text>

					<Stack gap='md'>
						<Group justify='center' mt='xs'>
							<PinInput
								length={4}
								value={pin}
								onChange={handleChange}
								onComplete={handleComplete}
								mask
								size='lg'
								type='number'
								error={!!error}
								disabled={isLoading || isLockedOut}
								autoFocus
							/>
						</Group>

						{error && (
							<Text c='red' size='sm' ta='center'>
								{error}
							</Text>
						)}
					</Stack>
				</Paper>
			</Container>
		</Center>
	);
}
