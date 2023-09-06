import { FunctionComponent, useRef, useState } from 'react';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { useMsal } from '@azure/msal-react';

import { ButtonComponent } from '../button';
import { EditFormComponent } from '../editForm';

import { getUniqueId, isObjEmpty } from '../../helpers';

import { SymbolsProps } from '../../types';

import { EditFromStyled, EditPanelStyled, PanelDetailsButtons, PanelDetailsStyled, PanelDetailsWrapperStyled } from './styles';

type PanelDetailsComponentProps = {
	setUpdateDraftSymbol: (symbol: SymbolsProps) => void;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
	enableReinitialize: boolean;
	onClosePanel: () => void;
	symbols: SymbolsProps[];
	symbol: SymbolsProps;
};
const isDivisibleBy24 = (value: number) => value % 24 === 0;

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	setUpdateDraftSymbol,
	updateCurrentSymbol,
	enableReinitialize,
	onClosePanel,
	symbols,
	symbol,
}): JSX.Element => {
	const { key, description, width, height, geometry, connectors } = symbol;
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
						enableReinitialize={false}
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
						validate={({ width, height, key }) => {
							const errors: FormikErrors<any> = {};
							// Unique key

							// Connector ID

							// IF no changes -> cant push save

							if (!isUniqueID(symbols, 'key', key)) {
								errors.key = 'Name must be unique';
							}

							if (!isDivisibleBy24(Number(width))) {
								errors.width = 'Width must be divisible by 24';
							}

							if (!isDivisibleBy24(Number(height))) {
								errors.height = 'Height must be divisible by 24';
							}

							// connectors.map(({ id }) => !isUniqueID(connectors, 'id', id) ? errors.connector = 'Connector must have unique ID' : '')

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
						{/* {({ values }) => (
              <EditFormComponent updateSymbol={updateCurrentSymbol}/>
            )} */}
						<EditFormComponent updateSymbol={updateCurrentSymbol} formChange={onFormChange} />
					</Formik>
				</EditFromStyled>
			</PanelDetailsWrapperStyled>
		</PanelDetailsStyled>
	);
};
