import { AppShell, Box } from '@mantine/core';

import { Section } from '@/shared/ui/section';
import { PureHeader } from '@/widgets/header';
import { OfflineBanner } from '@/widgets/offline-banner';

import { AudienceSection } from './ui/audience-section';
import { CtaSection } from './ui/cta-section';
import { DecorativeBackground } from './ui/decorative-background';
import { FaqSection } from './ui/faq-section';
import { FeaturesSection } from './ui/features-section';
import { Footer } from './ui/footer';
import { HeroSection } from './ui/hero-section';
import { HowItWorksSection } from './ui/how-it-works-section';
import { SecuritySection } from './ui/security-section';
import { StatsSection } from './ui/stats-section';

export function LandingPage() {
	return (
		<AppShell header={{ height: 53 }}>
			<AppShell.Header>
				<PureHeader />
				<Box px='sm' py='xs'>
					<OfflineBanner />
				</Box>
			</AppShell.Header>

			<AppShell.Main>
				<Box pos='relative'>
					<DecorativeBackground />
					<Section>
						<HeroSection />
					</Section>

					<StatsSection />
					<HowItWorksSection />
					{/* <ExampleSignals /> */}
					<FeaturesSection />
					<AudienceSection />
					<SecuritySection />
					<FaqSection />
					<CtaSection />
					<Footer />
				</Box>
			</AppShell.Main>
		</AppShell>
	);
}
