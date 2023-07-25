import { FunctionComponent, useRef } from 'react';
import { Formik, FormikProps } from 'formik';

import { EditFromStyled, EditPanelStyled, PanelDetailsButtons, PanelDetailsStyled, PanelDetailsWrapperStyled } from './styles';
import { ButtonComponent } from '../button';
import { SymbolConnector } from '../svg/Svg.types';
import { EditFormComponent } from '../editForm';
import { SymbolsProps } from '../../types';
// SymbolsProps
type PanelDetailsComponentProps = {
	symbol: {
		// children: any;
		width: string;
		key: string;
		description: string;
		geometry: string;
		height: string;
		viewBox: string;
		fill: string;
		connectors: SymbolConnector[];
	};
	isExistingSvg: boolean;
	enableReinitialize: boolean;
	updateCurrentSymbol: (symbol: SymbolsProps) => void;
};

type FormErrorsType = {
	width?: string;
	height?: string;
};

type DetailsChildrenProps = {};

const isDivisibleBy24 = (value: number) => value % 24 === 0;

export const PanelDetailsComponent: FunctionComponent<PanelDetailsComponentProps> = ({
	symbol,
	isExistingSvg,
	enableReinitialize,
	updateCurrentSymbol,
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

	return (
		<PanelDetailsStyled isShow>
			<PanelDetailsWrapperStyled>
				<EditPanelStyled></EditPanelStyled>

				<EditFromStyled>
					<PanelDetailsButtons>
						<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()}>
							Save
						</ButtonComponent>
						<ButtonComponent size="s" onClick={() => console.log('cancel')} appearance="secondary">
							Cancel
						</ButtonComponent>
					</PanelDetailsButtons>
					<Formik
						enableReinitialize={enableReinitialize}
						innerRef={formRef}
						initialValues={{
							name: key,
							description,
							width,
							height,
							geometry,
							dateTimeUpdated: new Date(),
							symbilId: 'Im random id',
							connectors,
						}}
						validate={({ width, height }) => {
							const errors: FormErrorsType = {};

							if (!isDivisibleBy24(Number(width))) {
								errors.width = 'Width must be divisible by 24';
							}

							if (!isDivisibleBy24(Number(height))) {
								errors.height = 'Height must be divisible by 24';
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								console.log(100, values);
								setSubmitting(false);
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
