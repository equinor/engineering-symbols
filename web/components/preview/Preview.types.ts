import { ColorThemeProps, IconProps } from '../../types';

export type PreviewComponentProps = {
	setPreviewColorPicked: (val: boolean) => void;
	setPreviewAppearance: (val: string) => void;
	setPreviewShow: (val: boolean) => void;
	appearance: string;
	selected: IconProps;
	isShow: boolean;
	theme: ColorThemeProps;
};
