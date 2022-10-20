import { IconProps } from '../../types';

export type PreviewComponentProps = {
	setPreviewColorPicked: (val: boolean) => void;
	setPreviewAppearance: (val: string) => void;
	selected: IconProps;
	theme: any;
	appearance: string;
};
