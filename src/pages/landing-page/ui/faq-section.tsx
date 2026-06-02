import { Accordion, Container, Stack, Title } from '@mantine/core';

export function FaqSection() {
	return (
		<Container size='sm' py={80}>
			<Stack gap={50}>
				<Title order={2} ta='center'>
					Часто задаваемые вопросы
				</Title>

				<Accordion variant='separated'>
					<Accordion.Item value='signals'>
						<Accordion.Control>Как часто публикуются торговые сигналы?</Accordion.Control>
						<Accordion.Panel>Сигналы публикуются в реальном времени алгоритмами, анализирующими рынок 24/7. Как только появляется выгодная возможность, сигнал немедленно отправляется в систему.</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='beginners'>
						<Accordion.Control>Подойдет ли платформа новичкам?</Accordion.Control>
						<Accordion.Panel>Да, наша платформа спроектирована так, чтобы быть понятной инвесторам любого уровня. Вы можете следовать готовым стратегиям и использовать сигналы, постепенно обучаясь анализу.</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='safety'>
						<Accordion.Control>Безопасно ли использовать ваши стратегии?</Accordion.Control>
						<Accordion.Panel>Любая торговля на бирже сопряжена с рисками. Мы предоставляем статистически выверенные сигналы и исторически успешные стратегии, однако решение о сделке всегда остается за вами. Мы настоятельно рекомендуем диверсифицировать риски.</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='cost'>
						<Accordion.Control>Сколько стоит использование платформы?</Accordion.Control>
						<Accordion.Panel>Базовый функционал, включая аналитику портфеля и часть стратегий, доступен бесплатно.</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='offline'>
						<Accordion.Control>Работает ли платформа без интернета?</Accordion.Control>
						<Accordion.Panel>Да! Благодаря поддержке PWA, вы можете просматривать сохраненную аналитику, стратегии и историю сделок даже в офлайн-режиме.</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='custom-signals'>
						<Accordion.Control>Могу ли я настроить сигналы под себя?</Accordion.Control>
						<Accordion.Panel>Конечно. Вы можете гибко конфигурировать типы получаемых сигналов, выбирать нужные индикаторы и инструменты, чтобы получать только ту информацию, которая подходит вашей торговой стратегии.</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Stack>
		</Container>
	);
}
