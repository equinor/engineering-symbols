import { IconProps } from '../../types';

export type DialogComponentProps = {
	onHandleClose: () => void;
	selectedName: string;
	icons: IconProps[];
};
