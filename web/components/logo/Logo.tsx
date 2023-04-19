import { LogoStyled } from './styles';

import Cat from '../../svg/cat.svg';

type LogoComponentProps = {
	stroke?: string;
	fill?: string;
};

export const LogoComponent: React.FunctionComponent<LogoComponentProps> = ({ stroke = 'background', fill = 'textWhite' }): JSX.Element => {
	return (
		<LogoStyled stroke={stroke} fill={fill}>
			<Cat />
		</LogoStyled>
	);
};
