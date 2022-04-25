import { css, SerializedStyles, Theme } from '@emotion/react';

import { IconAppearance, SvgSizeName } from '../../context';

export const icon =
	(size: SvgSizeName, appearance?: IconAppearance, rotate?: number) =>
	({ iconSizes, colors }: Theme): SerializedStyles => {

		return css`
			height: ${iconSizes[size] || iconSizes.l}rem;
			color: ${(colors[appearance as IconAppearance] || colors.main)};
			transform: rotate(${rotate}deg)
		`;
	};
