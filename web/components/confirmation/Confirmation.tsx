import { useState } from 'react';

import {
	ConfirmationCloseButtonStyled,
	ConfirmationWrapStyled,
	ConfirmationCustomizeStyled,
	ConfirmationStyled,
	ConfirmationButtonsStyled,
	ConfirmationContentStyled,
	ConfirmationTitleStyled,
} from './styles';

import { ButtonComponent } from '../button';
import { SymbolsProps } from '../../types';

import Close from '../../svg/close.svg';

const useConfirm = (symbol: SymbolsProps) => {
	const [open, setOpen] = useState(false);
	const [resolver, setResolver] = useState<any>({ resolve: null });

	const onHandle = async (status: boolean) => {
		setOpen(false);
		resolver.resolve(status);
	};

	const createPromise = () => {
		let resolver;

		return [
			new Promise((resolve, reject) => {
				resolver = resolve;
			}),
			resolver,
		];
	};

	const getConfirmation = async () => {
		setOpen(true);

		const [promise, resolve] = await createPromise();
		setResolver({ resolve });
		return promise;
	};

	const ConfirmationComponent = () => (
		<ConfirmationStyled isShow={open}>
			<ConfirmationCustomizeStyled>
				<ConfirmationCloseButtonStyled onClick={() => onHandle(false)}>
					<Close />
				</ConfirmationCloseButtonStyled>
				<ConfirmationWrapStyled>
					<ConfirmationTitleStyled>Conformation</ConfirmationTitleStyled>
					<ConfirmationContentStyled>
						Are you sure you want to delete <strong>{symbol && symbol.key}</strong>?
					</ConfirmationContentStyled>
					<ConfirmationButtonsStyled>
						<ButtonComponent onClick={() => onHandle(true)}>Confirm</ButtonComponent>
						<ButtonComponent appearance="secondary" onClick={() => onHandle(false)}>
							Cancel
						</ButtonComponent>
					</ConfirmationButtonsStyled>
					{/* <PreviewImageWrapStyled> */}
					{/* </PreviewImageWrapStyled> */}
				</ConfirmationWrapStyled>
			</ConfirmationCustomizeStyled>
		</ConfirmationStyled>
	);

	return [getConfirmation, ConfirmationComponent];
};

export default useConfirm;
