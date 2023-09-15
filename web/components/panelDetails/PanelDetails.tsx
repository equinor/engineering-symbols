import { FunctionComponent, useRef } from 'react';
import { Formik, FormikProps } from 'formik';
import { useMsal } from '@azure/msal-react';

import { ButtonComponent } from '../button';
import { EditFormComponent } from '../editForm';

import { SymbolsProps } from '../../types';

import { EditFromStyled, EditPanelStyled, PanelDetailsButtons, PanelDetailsStyled, PanelDetailsWrapperStyled } from './styles';
import React from 'react';

type PanelDetailsComponentProps = {
	setUpdateDraftSymbol: (symbol: SymbolsProps) => void;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
	enableReinitialize: boolean;
	onClosePanel: () => void;
	symbol: SymbolsProps;
};

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	setUpdateDraftSymbol,
	updateCurrentSymbol,
	enableReinitialize,
	onClosePanel,
	symbol,
}): JSX.Element => {
	const { key, description, width, height, geometry, connectors } = symbol;

	const formRef = useRef<FormikProps<any>>(null);

	const { instance } = useMsal();

	const { tenantId } = instance.getActiveAccount() as any;

	const onSubmitForm = () => {
		if (!formRef.current) return;

		formRef.current.handleSubmit();
	};

	const onFormChange = () => {
		const timer = setTimeout(() => {
			if (!formRef.current) return;

			updateCurrentSymbol(formRef.current.values);
		}, 1);

		return () => {
			clearTimeout(timer);
		};
	};

	// const isUniqueID = (obj: any, name: string, id: string) => obj.filter((sbl: { [x: string]: string }) => sbl[name] === id).length <= 0;

	return (
		<PanelDetailsStyled isShow>
			<PanelDetailsWrapperStyled>
				<EditPanelStyled />

				<EditFromStyled>
					<PanelDetailsButtons>
						<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()}>
							Save
						</ButtonComponent>
						<ButtonComponent size="s" onClick={() => onClosePanel()} appearance="secondary">
							Cancel
						</ButtonComponent>
					</PanelDetailsButtons>
					<Formik
						// enableReinitialize={enableReinitialize}
						// For symbol swithching
						enableReinitialize={true}
						innerRef={formRef}
						initialValues={{
							...symbol,
							key,
							description,
							width,
							height,
							owner: tenantId,
							geometry,
							connectors,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								setSubmitting(false);
								setUpdateDraftSymbol(values);
								console.log('⚡️', 'onSubmin value:', values);
							}, 400);
						}}>
						<EditFormComponent updateSymbol={updateCurrentSymbol} formChange={onFormChange} />
					</Formik>
				</EditFromStyled>
			</PanelDetailsWrapperStyled>
		</PanelDetailsStyled>
	);
};
