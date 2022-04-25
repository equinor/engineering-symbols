import { ReactElement, ReactNode } from 'react';
import { Theme, ThemeProvider } from '@emotion/react';

import { GlobalStyling } from './GlobalStyling';
import { standardThemes, ThemeName, ThemeProp } from '../context';

export type GlobalStylingOptions = {
	includeNormalize?: boolean;
	includeDefaultStyling?: boolean;
};

export type ThemedAppProps = {
	children?: ReactNode;
	theme?: ThemeProp;
	stylingOptions?: GlobalStylingOptions;
};

export const ThemedApp = ({ children, theme, stylingOptions }: ThemedAppProps): ReactElement | null => {
	const defaultTheme = standardThemes.equinor;
	const activeTheme: Theme = typeof theme === 'string' ? standardThemes[theme as ThemeName] : theme || defaultTheme;

	return (
		<ThemeProvider theme={activeTheme}>
			<GlobalStyling options={stylingOptions} />
			{children}
		</ThemeProvider>
	);
};
