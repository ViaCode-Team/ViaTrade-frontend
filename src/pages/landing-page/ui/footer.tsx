import {
	Box,
	Center,
	Container,
	Text,
} from '@mantine/core';

const YEAR = new Date().getFullYear();

export function Footer() {
	return (
		<Box mt={80} pos='relative' style={{ borderTop: '1px solid var(--mantine-color-dark-6)' }}>
			{/* Decorative top gradient line */}
			<Box
				pos='absolute'
				top={0}
				left={0}
				w='100%'
				h={1}
				style={{
					background: 'linear-gradient(90deg, transparent 0%, var(--mantine-color-brand-6) 50%, transparent 100%)',
					opacity: 0.5,
				}}
			/>

			<Container size='lg' pb={40} pt={30}>
				<Center mb={40}>
					<Box>
						<Text ta='center' fw={900} fz={32}>
							ViaTrade
						</Text>
						<Text c='dimmed' ta='center' size='sm' mt='xs' maw={300}>
							Высокотехнологичная платформа для тех, кто относится к трейдингу профессионально.
						</Text>
					</Box>
				</Center>

				<Center>
					<Text c='dimmed' size='sm'>
						©
						{' '}
						{YEAR}
						{' '}
						ViaTrade. Все права защищены.
					</Text>
				</Center>
			</Container>
		</Box>
	);
}
