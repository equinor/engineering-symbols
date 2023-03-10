import { ColorThemeProps, IconProps } from '../../types';

export type PreviewComponentProps = {
	setPreviewColorPicked: (val: boolean) => void;
	setPreviewAppearance: (val: string) => void;
	appearance: string;
	selected: IconProps;
	theme: ColorThemeProps;
};
