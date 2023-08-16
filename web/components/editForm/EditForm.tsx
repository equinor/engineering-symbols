import { FunctionComponent, useEffect } from 'react';
import { Form, Field, ErrorMessage, FieldArray, useFormikContext, FormikErrors } from 'formik';

import { ButtonComponent } from '../button';

import { SymbolConnector } from '../svg/Svg.types';
import { SymbolsProps } from '../../types';

import {
	EditFromRemoveConnectorStyled,
	EditFromAddConnectorButton,
	EditFromElementsStyled,
	EditFromElementStyled,
	ErrorMessageStyled,
} from './styles';
import { isObjEmpty } from '../../helpers';

// SymbolsProps
type EditFormComponentProps = {
	updateSymbol: (symbol: SymbolsProps) => void;
	formChange: () => void;
};

type FormElementsTypes = {
	id: string;
	name: string;
	type?: 'number' | 'text';
};

export const EditFormComponent: FunctionComponent<EditFormComponentProps> = ({ updateSymbol, formChange }): JSX.Element => {
	const { values, setValues, errors } = useFormikContext<any>();

	const handleRemoveConnector = (id: string) => {
		if (!values && !isObjEmpty(values.connectors)) return;

		const updatedConnectors = values.connectors.filter((connector: SymbolConnector) => connector.id !== id);
		const updatedSymbol = { ...values, connectors: updatedConnectors };

		setValues(updatedSymbol);
		updateSymbol(updatedSymbol);
	};

	// useEffect(() => errorChange(errors), [errors])

	const formElements: FormElementsTypes[] = [
		{
			id: 'key',
			name: 'Name',
		},
		{
			id: 'description',
			name: 'Description',
		},
		{
			id: 'width',
			name: 'Width',
		},
		{
			id: 'height',
			name: 'Height',
		},
		{
			id: 'paths',
			name: 'paths',
		},
	];

	const formConnectorElements = (i: number): FormElementsTypes[] => [
		{
			id: `connectors[${i}].id`,
			name: 'Id',
			type: 'number',
		},
		{
			id: `connectors[${i}].relativePosition.x`,
			name: 'Position X',
			type: 'number',
		},
		{
			id: `connectors[${i}].relativePosition.y`,
			name: 'Position Y',
			type: 'number',
		},
		{
			id: `connectors[${i}].direction`,
			name: 'Direction',
			type: 'number',
		},
	];

	const EditFromElement = ({ id, name, type = 'text' }: FormElementsTypes) => {
		return (
			<>
				<EditFromElementStyled>
					<label htmlFor={id}>{name}: </label>
					<Field type={type} id={id} name={id} required />
				</EditFromElementStyled>
				<ErrorMessageStyled>
					<ErrorMessage name={id} component="div" />
				</ErrorMessageStyled>
			</>
		);
	};

	return (
		<Form onChange={formChange}>
			{formElements.map((elems) => (
				<div key={elems.id}>
					<EditFromElement {...elems} />
				</div>
			))}
			<p>Connectors</p>
			<FieldArray name="connectors">
				{({ push }) => {
					const isConnectorsEmpty = isObjEmpty(values.connectors);
					const filteredConnectors = !isConnectorsEmpty && values.connectors.filter((x: any) => x !== undefined);

					return (
						<>
							{isConnectorsEmpty ? (
								<></>
							) : (
								filteredConnectors.map(({ id }: SymbolConnector, i: number) => (
									<EditFromElementsStyled key={id}>
										{formConnectorElements(i).map((elems) => (
											<div key={elems.id}>
												<EditFromElement {...elems} />
											</div>
										))}

										<EditFromRemoveConnectorStyled type="button" onClick={() => handleRemoveConnector(id)}>
											Remove Connector
										</EditFromRemoveConnectorStyled>
									</EditFromElementsStyled>
								))
							)}
							<EditFromAddConnectorButton>
								<ButtonComponent
									isWide
									type="button"
									onClick={() =>
										push({
											id: 1,
											relativePosition: {
												x: 0,
												y: 0,
											},
											direction: '',
										})
									}>
									Add Connector
								</ButtonComponent>
							</EditFromAddConnectorButton>
						</>
					);
				}}
			</FieldArray>

			{/* +++ metadata? */}
		</Form>
	);
};
