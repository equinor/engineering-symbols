import { FunctionComponent } from 'react';
import { Form, Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';

import {
	EditFromAddConnectorButton,
	EditFromElementStyled,
	EditFromElementsStyled,
	EditFromRemoveConnectorStyled,
	ErrorMessageStyled,
} from './styles';
import { ButtonComponent } from '../button';
import { SymbolConnector } from '../svg/Svg.types';
import { SymbolsProps } from '../../types';
// SymbolsProps
type EditFormComponentProps = {
	updateSymbol: (symbol: SymbolsProps) => void;
	formChange: () => void;
};

export const EditFormComponent: FunctionComponent<EditFormComponentProps> = ({ updateSymbol, formChange }): JSX.Element => {
	const { values, setValues } = useFormikContext<any>();

	const handleRemoveConnector = (id: string) => {
		if (!values) return;

		const updatedConnectors = values.connectors.filter((connector: SymbolConnector) => connector.id !== id);
		const updatedSymbol = { ...values, connectors: updatedConnectors };

		setValues(updatedSymbol);
		updateSymbol(updatedSymbol);
	};

	return (
		<Form onChange={formChange}>
			<EditFromElementStyled>
				<label htmlFor="key">Name: </label>
				<Field id="key" name="key" required />
			</EditFromElementStyled>
			<ErrorMessageStyled>
				<ErrorMessage name="key" component="div" />
			</ErrorMessageStyled>

			<EditFromElementStyled>
				<label htmlFor="description">Description: </label>
				<Field id="description" name="description" required />
			</EditFromElementStyled>

			<EditFromElementStyled>
				<label htmlFor="width">Width: </label>
				<Field id="width" name="width" required />
			</EditFromElementStyled>
			<ErrorMessageStyled>
				<ErrorMessage name="width" component="div" />
			</ErrorMessageStyled>

			<EditFromElementStyled>
				<label htmlFor="height">Height: </label>
				<Field id="height" name="height" required />
			</EditFromElementStyled>
			<ErrorMessageStyled>
				<ErrorMessage name="height" component="div" />
			</ErrorMessageStyled>

			<EditFromElementStyled>
				<label htmlFor="geometry">Geometry: </label>
				<Field id="geometry" name="geometry" required />
			</EditFromElementStyled>

			<p>Connectors</p>
			<FieldArray name="connectors">
				{({ push }) => (
					<>
						{values.connectors.map((connector: SymbolConnector, i: number) => (
							<EditFromElementsStyled key={connector.id}>
								<EditFromElementStyled>
									<label htmlFor={`connectors[${i}].id`}>Id: </label>
									<Field type="text" name={`connectors[${i}].id`} />
								</EditFromElementStyled>

								<EditFromElementStyled>
									<label htmlFor={`connectors[${i}].relativePosition.x`}>Position X:</label>
									<Field type="number" name={`connectors[${i}].relativePosition.x`} />
								</EditFromElementStyled>

								<EditFromElementStyled>
									<label htmlFor={`connectors[${i}].relativePosition.y`}>Position Y:</label>
									<Field type="number" name={`connectors[${i}].relativePosition.y`} />
								</EditFromElementStyled>

								<EditFromElementStyled>
									<label htmlFor={`connectors[${i}].direction`}>Direction:</label>
									<Field type="number" name={`connectors[${i}].direction`} />
								</EditFromElementStyled>
								<ErrorMessage name="connector" component="div" />

								<EditFromRemoveConnectorStyled type="button" onClick={() => handleRemoveConnector(connector.id)}>
									Remove Connector
								</EditFromRemoveConnectorStyled>
							</EditFromElementsStyled>
						))}
						<EditFromAddConnectorButton>
							<ButtonComponent
								isWide
								type="button"
								onClick={() =>
									push({
										id: '',
										relativePosition: {
											x: '',
											y: '',
										},
										direction: '',
									})
								}>
								Add Connector
							</ButtonComponent>
						</EditFromAddConnectorButton>
					</>
				)}
			</FieldArray>

			{/* +++ metadata? */}
		</Form>
	);
};
