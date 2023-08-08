import { FunctionComponent, useRef } from 'react';
import { Formik, FormikProps } from 'formik';

import { ButtonComponent } from '../button';
import { EditFormComponent } from '../editForm';

import { getUniqueId } from '../../helpers';

import { SymbolsProps } from '../../types';

import { EditFromStyled, EditPanelStyled, PanelDetailsButtons, PanelDetailsStyled, PanelDetailsWrapperStyled } from './styles';

type PanelDetailsComponentProps = {
	setUpdateSymbolToDraft: (symbol: SymbolsProps) => void;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
	enableReinitialize: boolean;
	onClosePanel: () => void;
	symbols: SymbolsProps[];
	symbol: SymbolsProps;
};

type FormErrorsType = {
	connector?: string;
	height?: string;
	width?: string;
	key?: string;
};

const isDivisibleBy24 = (value: number) => value % 24 === 0;

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	setUpdateSymbolToDraft,
	updateCurrentSymbol,
	enableReinitialize,
	onClosePanel,
	symbols,
	symbol,
}): JSX.Element => {
	const { key, description, width, height, geometry, connectors } = symbol;

	const formRef = useRef<FormikProps<any>>(null);

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
						<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()}>
							Save
						</ButtonComponent>
						<ButtonComponent size="s" onClick={() => onClosePanel()} appearance="secondary">
							Cancel
						</ButtonComponent>
					</PanelDetailsButtons>
					<Formik
						enableReinitialize={enableReinitialize}
						innerRef={formRef}
						initialValues={{
							key,
							description,
							width,
							height,
							geometry,
							dateTimeUpdated: new Date(),
							symbilId: getUniqueId(),
							connectors,
						}}
						validate={({ width, height, key }) => {
							const errors: FormErrorsType = {};
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

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								setSubmitting(false);
								setUpdateSymbolToDraft(values);
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
