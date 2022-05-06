import { css, SerializedStyles, Theme } from '@emotion/react';

import { IconAppearance } from '../../context';

export const icon =
	(appearance?: IconAppearance, rotate?: number) =>
	({ colors }: Theme): SerializedStyles => {
		return css`
			stroke: ${colors[appearance as IconAppearance] || colors.main};
			transform: rotate(${rotate}deg);
		`;
	};
