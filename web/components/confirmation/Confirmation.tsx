import { FunctionComponent, useState } from 'react';

import {
	ConfirmationCloseButtonStyled,
	ConfirmationCustomizeStyled,
	ConfirmationButtonsStyled,
	ConfirmationContentStyled,
	ConfirmationTitleStyled,
	ConfirmationWrapStyled,
	ConfirmationStyled,
} from './styles';

import { ButtonComponent } from '../button';
import { SymbolsProps } from '../../types';

import Close from '../../svg/close.svg';

type useConfirmProps = {
	symbol: SymbolsProps | null | undefined;
	message: string;
	buttons?: { confirm: string; cancel: string } | null;
};

export const useConfirm = ({ symbol, message, buttons }: useConfirmProps) => {
	const [open, setOpen] = useState(false);
	const [resolver, setResolver] = useState<any>({ resolve: null });

	const onHandle = async (status: boolean) => {
		setOpen(false);
		resolver.resolve(status);
	};

	const onHandleClose = async () => {
		setOpen(false);
		resolver.resolve(null);
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
		const [promise, resolve] = await createPromise();

		setOpen(true);
		// Confirm => true
		// Cancel => false
		// Close => null
		setResolver({ resolve });

		return promise;
	};

	const ConfirmationComponent: FunctionComponent = () => (
		<ConfirmationStyled isShow={open}>
			<ConfirmationCustomizeStyled>
				<ConfirmationCloseButtonStyled onClick={() => onHandleClose()}>
					<Close />
				</ConfirmationCloseButtonStyled>
				<ConfirmationWrapStyled>
					<ConfirmationTitleStyled>Conformation</ConfirmationTitleStyled>
					<ConfirmationContentStyled>
						{message} <strong>{symbol && symbol.identifier}</strong>?
					</ConfirmationContentStyled>
					<ConfirmationButtonsStyled>
						<ButtonComponent onClick={() => onHandle(true)}>{buttons?.confirm ?? 'Confirm'}</ButtonComponent>
						<ButtonComponent appearance="secondary" onClick={() => onHandle(false)}>
							{buttons?.cancel ?? 'Cancel'}
						</ButtonComponent>
					</ConfirmationButtonsStyled>
				</ConfirmationWrapStyled>
			</ConfirmationCustomizeStyled>
		</ConfirmationStyled>
	);

	return [getConfirmation, ConfirmationComponent];
};
