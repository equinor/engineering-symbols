import { FunctionComponent, ReactNode } from 'react';

import { ButtonStyled } from './styles';

interface ButtonComponentProps extends React.ComponentPropsWithoutRef<'button'> {
	children: ReactNode;
	appearance?: 'secondary';
	size?: 's';
}
export const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({ children, ...rest }) => <ButtonStyled {...rest}>{children}</ButtonStyled>;

export default ButtonComponent;
