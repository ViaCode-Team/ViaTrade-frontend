import type { AnchorProps, PolymorphicComponentProps } from '@mantine/core';

import { Anchor } from '@mantine/core';
import { Link as RouterLink } from 'react-router';

type AppLinkProps = PolymorphicComponentProps<typeof RouterLink, AnchorProps>;

export function AppLink(props: AppLinkProps) {
	return <Anchor component={RouterLink} {...props} />;
}
