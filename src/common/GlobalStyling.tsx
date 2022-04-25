import { css, Global, SerializedStyles } from '@emotion/react';
import { ReactElement } from 'react';

import { GlobalStylingOptions } from './ThemedApp';
import * as externalStyles from './external.styles';

export type GlobalStylingProps = {
	options?: GlobalStylingOptions;
};

const defaultStyling = (): SerializedStyles => {
	return css`
		html {
			box-sizing: border-box;
			-webkit-tap-highlight-color: transparent;
			-webkit-font-smoothing: subpixel-antialiased;
		}
	`;
};

export const GlobalStyling = ({ options }: GlobalStylingProps): ReactElement => {
	const { includeDefaultStyling = true, includeNormalize = true } = options || {};

	return <Global styles={[includeNormalize && externalStyles.modernNormalize, includeDefaultStyling && defaultStyling()]} />;
};
