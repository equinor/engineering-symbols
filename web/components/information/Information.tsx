import { useEffect, useRef, useState } from 'react';

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
import { useOnClickOutside } from '../../helpers';

export const InformationComponent = ({ appearance, title, message, refresh }: InformationComponentTypes) => {
	const [open, setOpen] = useState(false);

	const informationRef = useRef(null);

	const onHandle = () => setOpen(false);

	useEffect(() => {
		message && setOpen(true);
	}, [refresh, message]);

	useOnClickOutside(informationRef, () => setOpen(false));

	return (
		<InformationStyled isShow={open} appearance={appearance} ref={informationRef}>
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
