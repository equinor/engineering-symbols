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

import { InformationComponentTypes } from './Information.types';

export const InformationComponent = ({ appearance, title, message }: InformationComponentTypes) => {
	console.log(188, appearance);
	const [open, setOpen] = useState(false);

	const onHandle = () => setOpen(false);

	useEffect(() => {
		!!message && !open && setOpen(true);
	}, [message]);

	return (
		<InformationStyled isShow={open} appearance={appearance}>
			<InformationCustomizeStyled>
				<InformationCloseButtonStyled onClick={() => onHandle()}>
					<Close />
				</InformationCloseButtonStyled>
				<InformationWrapStyled>
					<InformationTitleStyled>{title}</InformationTitleStyled>
					{message && <InformationContentStyled dangerouslySetInnerHTML={{ __html: message }} />}
				</InformationWrapStyled>
			</InformationCustomizeStyled>
		</InformationStyled>
	);
};

export default InformationComponent;
