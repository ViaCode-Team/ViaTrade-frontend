import type { ReactNode } from 'react';

import {
	ActionIcon,
	Center,
	Container,
	Group,
	Paper,
	PinInput,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

import { Logo } from '@/shared/ui/logo';

import { usePinSetup } from '../model/use-pin-setup';

type PinSetupProps = {
	actionSlot?: ReactNode;
};

export function PinSetup({ actionSlot }: PinSetupProps) {
	const {
		step,
		pin,
		confirmPin,
		error,
		isLoading,
		handlePinChange,
		handleConfirmPinChange,
		handleStep1Complete,
		handleStep2Complete,
		goBack,
	} = usePinSetup();

	return (
		<Center style={{ width: '100vw', height: '100vh', position: 'relative' }}>
			<div style={{ position: 'absolute', top: 32, left: 32 }}>
				<Logo />
			</div>

			<Container size='xs' style={{ width: '100%', maxWidth: '400px' }}>
				<Paper p='xl' withBorder style={{ position: 'relative' }}>
					{step === 2 && (
						<ActionIcon
							variant='subtle'
							color='gray'
							onClick={goBack}
							style={{ position: 'absolute', top: '20px', left: '20px' }}
							disabled={isLoading}
						>
							<IconArrowLeft size={20} />
						</ActionIcon>
					)}

					<Title order={2} ta='center' mt={step === 2 ? 'md' : 'xs'} mb='xs'>
						{step === 1 ? 'Создание ПИН-кода' : 'Подтверждение ПИН-кода'}
					</Title>

					<Text c='dimmed' size='sm' ta='center' mb='xl'>
						{step === 1
							? 'Придумайте 4-значный ПИН-код для защиты ваших локальных данных.'
							: 'Повторите придуманный ПИН-код для подтверждения.'}
					</Text>

					{step === 1 && (
						<Stack gap='md'>
							<Group justify='center' mt='xs'>
								<PinInput
									length={4}
									value={pin}
									onChange={handlePinChange}
									onComplete={handleStep1Complete}
									mask
									size='lg'
									type='number'
									error={!!error}
									autoFocus
								/>
							</Group>

							{error && (
								<Text c='red' size='sm' ta='center'>
									{error}
								</Text>
							)}
						</Stack>
					)}

					{step === 2 && (
						<Stack gap='md'>
							<Group justify='center' mt='xs'>
								<PinInput
									length={4}
									value={confirmPin}
									onChange={handleConfirmPinChange}
									onComplete={handleStep2Complete}
									mask
									size='lg'
									type='number'
									error={!!error}
									disabled={isLoading}
									autoFocus
								/>
							</Group>

							{error && (
								<Text c='red' size='sm' ta='center'>
									{error}
								</Text>
							)}
						</Stack>
					)}

				</Paper>
			</Container>

			{actionSlot && (
				<div style={{ position: 'absolute', top: 32, right: 32 }}>
					{actionSlot}
				</div>
			)}
		</Center>
	);
}
