import { FunctionComponent, useState, useRef } from 'react';

import {
	ConfirmationCloseButtonStyled,
	ConfirmationCustomizeStyled,
	ConfirmationButtonsStyled,
	ConfirmationContentStyled,
	ConfirmationTitleStyled,
	ConfirmationWrapStyled,
	ConfirmationStyled,
} from './styles';

import { useOnClickOutside } from '../../helpers';

import { ButtonComponent } from '../button';
import { SymbolsProps } from '../../types';

import Close from '../../svg/close.svg';

export interface useConfirmProps extends ConfirmationModuleProps {
	symbol: SymbolsProps | null | undefined;
}

export type ConfirmationModuleProps = {
	title?: string;
	message: string;
	buttons?: { confirm: string; cancel: string } | null;
};

export const useConfirm = ({ symbol, message, buttons, title }: useConfirmProps) => {
	const [open, setOpen] = useState(false);
	const [resolver, setResolver] = useState<any>({ resolve: null });

	const confirmationRef = useRef(null);

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

	useOnClickOutside(confirmationRef, () => open && onHandleClose());

	const ConfirmationComponent: FunctionComponent = () => (
		<ConfirmationStyled isShow={open} ref={confirmationRef}>
			<ConfirmationCustomizeStyled>
				<ConfirmationCloseButtonStyled onClick={() => onHandleClose()}>
					<Close />
				</ConfirmationCloseButtonStyled>
				<ConfirmationWrapStyled>
					<ConfirmationTitleStyled>{title ?? 'Confirmation'}</ConfirmationTitleStyled>
					<ConfirmationContentStyled>
						{message} <strong>{symbol && symbol.key}</strong>?
					</ConfirmationContentStyled>
					<ConfirmationButtonsStyled>
						<ButtonComponent appearance="secondary" onClick={() => onHandle(true)}>
							{buttons?.confirm ?? 'Confirm'}
						</ButtonComponent>
						<ButtonComponent onClick={() => onHandle(false)}>{buttons?.cancel ?? 'Cancel'}</ButtonComponent>
					</ConfirmationButtonsStyled>
				</ConfirmationWrapStyled>
			</ConfirmationCustomizeStyled>
		</ConfirmationStyled>
	);

	return [getConfirmation, ConfirmationComponent];
};
