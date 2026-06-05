import { AudienceSection } from './ui/audience-section';
import { CtaSection } from './ui/cta-section';
import { ExampleSignals } from './ui/example-signals';
import { FaqSection } from './ui/faq-section';
import { FeaturesSection } from './ui/features-section';
import { HeroSection } from './ui/hero-section';
import { HowItWorksSection } from './ui/how-it-works-section';
import { LandingLayout } from './ui/landing-layout';
import { SecuritySection } from './ui/security-section';
import { StatsSection } from './ui/stats-section';

export function LandingPage() {
	return (
		<LandingLayout>
			<HeroSection />
			<StatsSection />
			<HowItWorksSection />
			<ExampleSignals />
			<FeaturesSection />
			<AudienceSection />
			<SecuritySection />
			<FaqSection />
			<CtaSection />
		</LandingLayout>
	);
}
