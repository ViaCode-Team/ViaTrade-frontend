import { Box } from '@mantine/core';

export function DecorativeBackground() {
	return (
		<Box
			visibleFrom='sm'
			pos='absolute'
			inset={0}
			style={{ zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}
		>
			{/* 1 */}
			<Box
				pos='absolute'
				top='3%'
				left='3%'
				p='md'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.25,
					transform: 'rotate(-5deg)',
					width: 200,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>SBER / RUB</Box>
				<Box fz='lg' c='teal.4' fw={700} mb={10}>+12.4%</Box>
				<svg width='100%' height='40' viewBox='0 0 100 40'>
					<path d='M0,40 L10,30 L20,35 L40,10 L50,15 L70,5 L80,10 L100,0' fill='none' stroke='var(--mantine-color-teal-5)' strokeWidth='2' />
				</svg>
			</Box>

			{/* 2 */}
			<Box
				pos='absolute'
				top='8%'
				right='4%'
				p='md'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.2,
					transform: 'rotate(4deg)',
					width: 220,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={8}>Прибыль за месяц</Box>
				<Box fz='xl' c='white' fw={700}>425 000 ₽</Box>
				<Box fz='xs' c='teal.5' fw={500} mt={4}>▲ 8.2% с прошлого месяца</Box>
			</Box>

			{/* 3 */}
			<Box
				pos='absolute'
				top='18%'
				left='5%'
				p='sm'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.2,
					transform: 'rotate(3deg)',
					width: 160,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>Сигнал: LKOH</Box>
				<Box fz='sm' c='teal.4' fw={700}>ПОКУПАТЬ</Box>
			</Box>

			{/* 4 */}
			<Box
				pos='absolute'
				top='25%'
				right='6%'
				p='sm'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.2,
					transform: 'rotate(-3deg)',
					width: 150,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={10}>GAZP / RUB</Box>
				<svg width='100%' height='50'>
					<line x1='20' y1='10' x2='20' y2='40' stroke='var(--mantine-color-teal-5)' strokeWidth='1' />
					<rect x='17' y='15' width='6' height='20' fill='var(--mantine-color-teal-5)' />
					<line x1='40' y1='5' x2='40' y2='30' stroke='var(--mantine-color-teal-5)' strokeWidth='1' />
					<rect x='37' y='10' width='6' height='15' fill='var(--mantine-color-teal-5)' />
					<line x1='60' y1='15' x2='60' y2='45' stroke='var(--mantine-color-red-5)' strokeWidth='1' />
					<rect x='57' y='20' width='6' height='20' fill='var(--mantine-color-red-5)' />
					<line x1='80' y1='10' x2='80' y2='35' stroke='var(--mantine-color-teal-5)' strokeWidth='1' />
					<rect x='77' y='12' width='6' height='15' fill='var(--mantine-color-teal-5)' />
				</svg>
			</Box>

			{/* 5 */}
			<Box
				pos='absolute'
				top='35%'
				left='2%'
				p='md'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.15,
					transform: 'rotate(-6deg)',
					width: 180,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>Торговый объем</Box>
				<Box fz='lg' c='gray.2' fw={700} mb={8}>14.2M ₽</Box>
				<svg width='100%' height='30' viewBox='0 0 100 30'>
					<rect x='0' y='10' width='10' height='20' fill='var(--mantine-color-brand-6)' opacity={0.5} />
					<rect x='15' y='5' width='10' height='25' fill='var(--mantine-color-brand-6)' opacity={0.6} />
					<rect x='30' y='15' width='10' height='15' fill='var(--mantine-color-brand-6)' opacity={0.4} />
					<rect x='45' y='0' width='10' height='30' fill='var(--mantine-color-brand-6)' opacity={0.8} />
					<rect x='60' y='10' width='10' height='20' fill='var(--mantine-color-brand-6)' opacity={0.5} />
				</svg>
			</Box>

			{/* 6 */}
			<Box
				pos='absolute'
				top='48%'
				right='3%'
				p='sm'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.15,
					transform: 'rotate(5deg)',
					width: 170,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>Сигнал: YNDX</Box>
				<Box fz='sm' c='red.4' fw={700}>ПРОДАВАТЬ (85%)</Box>
			</Box>

			{/* 7 */}
			<Box
				pos='absolute'
				top='60%'
				left='6%'
				p='md'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.2,
					transform: 'rotate(2deg)',
					width: 200,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>TCSG / RUB</Box>
				<Box fz='lg' c='teal.4' fw={700} mb={10}>+5.1%</Box>
				<svg width='100%' height='40' viewBox='0 0 100 40'>
					<path d='M0,30 L20,35 L40,20 L60,25 L80,5 L100,0' fill='none' stroke='var(--mantine-color-teal-5)' strokeWidth='2' />
				</svg>
			</Box>

			{/* 8 */}
			<Box
				pos='absolute'
				top='75%'
				right='5%'
				p='sm'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.15,
					transform: 'rotate(-4deg)',
					width: 160,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={4}>Активные сделки</Box>
				<Box fz='xl' c='brand.4' fw={700}>14</Box>
			</Box>

			{/* 9 */}
			<Box
				pos='absolute'
				top='85%'
				left='4%'
				p='sm'
				style={{
					background: 'var(--mantine-color-dark-8)',
					border: '1px solid var(--mantine-color-dark-5)',
					borderRadius: 'var(--mantine-radius-md)',
					opacity: 0.2,
					transform: 'rotate(1deg)',
					width: 140,
				}}
			>
				<Box fz='xs' c='dimmed' fw={600} mb={2}>API Ping</Box>
				<Box fz='sm' c='teal.4' fw={700}>12ms</Box>
			</Box>
		</Box>
	);
}
