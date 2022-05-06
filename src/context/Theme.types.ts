import { Theme } from '@emotion/react';

export type IconAppearance = 'main' | 'dark' | 'light';
export type BaseColors = Record<IconAppearance, string>;

export type ThemeName = 'equinor';
export type ThemeProp = ThemeName | Theme;
