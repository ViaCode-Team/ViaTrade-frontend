import type { ReactNode } from 'react';

import {
	Flex,
	type FlexProps,
	Text,
	type TextProps,
} from '@mantine/core';

import cls from './info-pair.module.css';

type InfoPairAlign = 'start' | 'end';

type InfoPairItem = {
	label: ReactNode;
	value: ReactNode;
	align?: InfoPairAlign;
	labelProps?: TextProps;
	valueProps?: TextProps;
};

type InfoPairProps = Omit<FlexProps, 'children'> & {
	items: readonly [InfoPairItem, InfoPairItem];
};

function getTextAlign(align: InfoPairAlign): TextProps['ta'] {
	return align === 'end' ? 'end' : undefined;
}

function renderInfoPairItem(item: InfoPairItem, defaultAlign: InfoPairAlign) {
	const align = item.align ?? defaultAlign;

	return (
		<Flex direction='column' className={cls.root}>
			<Text
				size='sm'
				c='dimmed'
				ta={getTextAlign(align)}
				truncate='end'
				{...item.labelProps}
			>
				{item.label}
			</Text>

			<Text
				fw='bold'
				ta={getTextAlign(align)}
				truncate
				{...item.valueProps}
			>
				{item.value}
			</Text>
		</Flex>
	);
}

export function InfoPair({ items, gap = 'sm', ...props }: InfoPairProps) {
	return (
		<Flex gap={gap} {...props}>
			{renderInfoPairItem(items[0], 'start')}
			{renderInfoPairItem(items[1], 'end')}
		</Flex>
	);
}
