import { Theme } from '@emotion/react';

export type IconAppearance = 'main' | 'dark' | 'light';
export type BaseColors = Record<IconAppearance, string>;

export type SvgSizeName = 's' | 'm' | 'l';
export type SvgSizes = Record<SvgSizeName, number>;

export type ThemeName = 'equinor';
export type ThemeProp = ThemeName | Theme;
