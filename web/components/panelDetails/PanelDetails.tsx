import { FunctionComponent, useRef, useState } from 'react';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { useMsal } from '@azure/msal-react';

import { ButtonComponent } from '../button';
import { EditFormComponent } from '../editForm';

import { ConnectorsProps, SymbolsProps } from '../../types';
import { isObjEmpty } from '../../helpers';

import { EditFromStyled, EditPanelStyled, PanelDetailsButtons, PanelDetailsStyled, PanelDetailsWrapperStyled } from './styles';

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
	const { key, description, geometry, connectors } = symbol;

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

				<EditFromStyled>
					<PanelDetailsButtons>
						<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()} hasError={hasFormError}>
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
						initialTouched={{ key: true }}
						innerRef={formRef}
						initialValues={{
							...symbol,
							key,
							description,
							owner: tenantId,
							geometry,
							connectors,
						}}
						validate={({ connectors }) => {
							const errors: FormikErrors<any> = {};

							// Validate each item in the array
							connectors.forEach((item: ConnectorsProps, i: number) => {
								if (!item.id) {
									errors[`connectors[${i}].id`] = 'ID is required';
								}
								if (item.relativePosition.x > 0) {
									errors[`connectors[${i}].relativePosition.x`] = 'Position X is required';
								}
								if (item.relativePosition.y > 0) {
									errors[`connectors[${i}].relativePosition.y`] = 'Position Y is required';
								}
								if (item.direction > 0) {
									errors[`connectors[${i}].direction`] = 'Direction is required';
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
						<EditFormComponent updateSymbol={updateCurrentSymbol} formChange={onFormChange} />
					</Formik>
				</EditFromStyled>
			</PanelDetailsWrapperStyled>
		</PanelDetailsStyled>
	);
};
