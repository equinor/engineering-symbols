import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react';

import { ButtonStyled } from './styles';

interface ButtonComponentProps extends ComponentPropsWithoutRef<'button'> {
	appearance?: 'secondary';
	children: ReactNode;
	hasError?: boolean;
	isWide?: boolean;
	size?: 's';
}
export const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({ children, ...rest }) => <ButtonStyled {...rest}>{children}</ButtonStyled>;

export default ButtonComponent;
