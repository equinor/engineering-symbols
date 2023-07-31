import { useEffect, useState } from 'react';

import Close from '../../svg/close.svg';

import {
	InformationCloseButtonStyled,
	InformationCustomizeStyled,
	InformationContentStyled,
	InformationTitleStyled,
	InformationWrapStyled,
	InformationStyled,
} from './styles';

type InformationComponentTypes = {
	message?: string;
	title?: string;
};

export const InformationComponent = ({ title, message }: InformationComponentTypes) => {
	const [open, setOpen] = useState(false);

	const onHandle = () => setOpen(false);

	useEffect(() => {
		!!message && !open && setOpen(true);
	}, [message]);

	return (
		<InformationStyled isShow={open}>
			<InformationCustomizeStyled>
				<InformationCloseButtonStyled onClick={() => onHandle()}>
					<Close />
				</InformationCloseButtonStyled>
				<InformationWrapStyled>
					<InformationTitleStyled>{title}</InformationTitleStyled>
					<InformationContentStyled>{message}</InformationContentStyled>
				</InformationWrapStyled>
			</InformationCustomizeStyled>
		</InformationStyled>
	);
};

export default InformationComponent;
