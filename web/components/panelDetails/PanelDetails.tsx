import { FunctionComponent, MutableRefObject, useRef, useState } from 'react';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { useMsal } from '@azure/msal-react';

import { ButtonComponent } from '../button';
import { EditFormComponent } from '../editForm';

import { ConnectorsProps, SymbolsProps } from '../../types';
import { isObjEmpty } from '../../helpers';

import {
	EditFromButtonsWrapper,
	EditFromStyled,
	EditFromWrapper,
	EditPanelStyled,
	PanelDetailsButtons,
	PanelDetailsStyled,
	PanelDetailsWrapperStyled,
} from './styles';

type PanelDetailsComponentProps = {
	setUpdateDraftSymbol: (symbol: SymbolsProps) => void;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
	enableReinitialize: boolean;
	onAddConnector: () => void;
	onClosePanel: () => void;
	disabledForm: boolean;
	elementRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
	symbol: SymbolsProps;
};

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	setUpdateDraftSymbol,
	updateCurrentSymbol,
	enableReinitialize,
	onAddConnector,
	elementRefs,
	onClosePanel,
	disabledForm,
	symbol,
}): JSX.Element => {
	const { identifier, description, shape, connectionPoints } = symbol;

	const [hasFormError, setHasFormError] = useState<boolean>(false);

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

	const isUniqueID = (obj: any, name: string, id: string) => obj.filter((sbl: { [x: string]: string }) => sbl[name] === id).length <= 0;

	return (
		<PanelDetailsStyled isShow>
			<PanelDetailsWrapperStyled>
				<EditPanelStyled />

				<EditFromStyled disabled={disabledForm}>
					<EditFromWrapper disabled={disabledForm}>
						<Formik
							// enableReinitialize={enableReinitialize}
							// For symbol swithching
							enableReinitialize={true}
							initialTouched={{ key: true }}
							innerRef={formRef}
							initialValues={{
								...symbol,
								identifier,
								description,
								owner: tenantId,
								shape,
								connectionPoints,
							}}
							validate={({ connectionPoints }) => {
								const errors: FormikErrors<any> = {};

								console.log(101, connectionPoints);

								// Validate each item in the array
								connectionPoints.forEach((item: ConnectorsProps, i: number) => {
									// TODO: we must also check that the name is unique and contains only alpha characters
									if (item.identifier === undefined || item.identifier === '') {
										errors[`connectors[${i}].name`] = 'Name is required';
									}
									if (typeof item.position.x !== 'number') {
										errors[`connectors[${i}].relativePosition.x`] = 'Position X is required';
									}
									if (typeof item.position.y !== 'number') {
										errors[`connectors[${i}].relativePosition.y`] = 'Position Y is required';
									}
									if (typeof item.direction !== 'number' || item.direction < 0 || item.direction > 360) {
										errors[`connectors[${i}].direction`] = 'Direction is required and must be between 0 and 360';
									}
								});

								setHasFormError(!isObjEmpty(errors));

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									setSubmitting(false);
									setUpdateDraftSymbol(values);
									console.log('⚡️', 'onSubmin value:', values);
								}, 400);
							}}>
							<EditFormComponent
								addNewConnector={onAddConnector}
								updateSymbol={updateCurrentSymbol}
								hasDisabled={disabledForm}
								formChange={onFormChange}
								refs={elementRefs}
							/>
						</Formik>
					</EditFromWrapper>
					<EditFromButtonsWrapper disabled={disabledForm}>
						{!disabledForm && (
							<PanelDetailsButtons>
								<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()} hasError={hasFormError}>
									Save
								</ButtonComponent>
								<ButtonComponent size="s" onClick={() => onClosePanel()} appearance="secondary">
									Cancel
								</ButtonComponent>
							</PanelDetailsButtons>
						)}
					</EditFromButtonsWrapper>
				</EditFromStyled>
			</PanelDetailsWrapperStyled>
		</PanelDetailsStyled>
	);
};
