import { Theme, ThemeContext, ThemeProvider as EmotionThemeProvider, useTheme } from '@emotion/react';
import React, { ReactElement, ReactNode } from 'react';

import { BaseColors, ThemeName, ThemeProp } from './Theme.types';
import { ThemeEquinor } from './themes';

declare module '@emotion/react' {
	export interface Theme {
		name: ThemeName;
		colors: BaseColors;
	}
}

export const standardThemes: Record<ThemeName, Theme> = {
	equinor: ThemeEquinor,
};

export type ThemeProviderProps = {
	theme: ThemeProp;
	children: ReactNode;
};

export const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactElement => (
	<EmotionThemeProvider theme={typeof theme === 'string' ? standardThemes[theme] : theme}>{children}</EmotionThemeProvider>
);

export const ThemeConsumer = ThemeContext.Consumer;

export { useTheme };
