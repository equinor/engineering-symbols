import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react';

import { ButtonStyled } from './styles';

interface ButtonComponentProps extends ComponentPropsWithoutRef<'button'> {
	appearance?: 'secondary';
	hasError?: boolean;
	disabled?: boolean;
	children: ReactNode;
	isWide?: boolean;
	size?: 's';
}
export const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({ children, ...rest }) => <ButtonStyled {...rest}>{children}</ButtonStyled>;

export default ButtonComponent;
