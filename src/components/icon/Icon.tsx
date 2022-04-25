/** @jsxImportSource @emotion/react */
import React, { ComponentType, ReactElement } from 'react';

import { ThemedApp } from '../../common';

import * as styles from './Icon.styles';
import { IconName, IconProps, SvgBaseProps } from './Icon.types';
import * as Icons from './icons';

export const components: Record<IconName, ComponentType<SvgBaseProps>> = {
	'arrow-right': Icons.ArrowRight,
	'arrow-down': Icons.ArrowDown,
	'arrow-up': Icons.ArrowUp,
};

export const Icon = ({ name, size = 'm', appearance, rotate = 0, ...rest }: IconProps): ReactElement | null => {
	const Component = components[name];

	return Component ? (
		<ThemedApp>
			<Component css={styles.icon(size, appearance, rotate)} {...rest} />
		</ThemedApp>
	) : null;
};
