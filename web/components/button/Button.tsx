import { Chip, Typography } from '@equinor/eds-core-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, FunctionComponent } from 'react';

import packageJson from '../../package.json';

import Cat from '../../svg/cat.svg';

import { ButtonStyled } from './styles';

interface ButtonComponentProps {
	children: any;
}

export const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({ children }) => {
	const [isMobileBurgerOpen, setMobileBurgerOpen] = useState<boolean>(false);
	const { pathname } = useRouter();

	return (
		<>
			<ButtonStyled>{children}</ButtonStyled>
		</>
	);
};

export default ButtonComponent;
