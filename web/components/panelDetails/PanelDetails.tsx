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
import { SymbolConnector } from '../symbolEditor';

type PanelDetailsComponentProps = {
	setUpdateDraftSymbol: (symbol: SymbolsProps) => void;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
	enableReinitialize: boolean;
	onAddConnector: () => void;
	onClosePanel: () => void;
	disabledForm: boolean;
	elementRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
	connector: SymbolConnector | null;
	symbol: SymbolsProps;
	show: boolean;
};

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	setUpdateDraftSymbol,
	updateCurrentSymbol,
	enableReinitialize,
	onAddConnector,
	elementRefs,
	onClosePanel,
	disabledForm,
	connector,
	symbol,
	show,
}): JSX.Element => {
	const { key, description, geometry, connectors, ...rest } = symbol;

	const [hasFormError, setHasFormError] = useState<boolean>(false);

	const formRef = useRef<FormikProps<any>>(null);

	const { instance } = useMsal();

	const { name, username } = instance.getActiveAccount() as any;

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
		<PanelDetailsStyled isShow={show}>
			<PanelDetailsWrapperStyled>
				<EditPanelStyled />

				<EditFromStyled disabled={disabledForm}>
					<EditFromWrapper disabled={disabledForm}>
						<Formik
							// enableReinitialize={enableReinitialize}
							// For symbol swithching
							// Workaround for eble to switch between svgs & keeping name value
							enableReinitialize={enableReinitialize}
							// initialTouched={{ key: true }}
							innerRef={formRef}
							initialValues={{
								...rest,
								key,
								description,
								creators: [{ name, email: username }],
								geometry,
								connectors,
								dateTimeModified: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, -1) + 'Z',
							}}
							validate={({ connectors }) => {
								const errors: FormikErrors<any> = {};

								// Validate each item in the array
								connectors.forEach((item: ConnectorsProps, i: number) => {
									// TODO: we must also check that the name is unique and contains only alpha characters
									if (item.id === undefined || item.id === '') {
										errors[`connectors[${i}].id`] = 'Name is required';
									}
									if (typeof item.relativePosition.x !== 'number') {
										errors[`connectors[${i}].relativePosition.x`] = 'Position X is required';
									}
									if (typeof item.relativePosition.y !== 'number') {
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
								currentConnector={connector}
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
								<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()} hasError={hasFormError} appearance="secondary">
									Save
								</ButtonComponent>
								<ButtonComponent size="s" onClick={() => onClosePanel()}>
									Close
								</ButtonComponent>
							</PanelDetailsButtons>
						)}
					</EditFromButtonsWrapper>
				</EditFromStyled>
			</PanelDetailsWrapperStyled>
		</PanelDetailsStyled>
	);
};
