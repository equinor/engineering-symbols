import { FunctionComponent } from 'react';
import { Form, Field, FieldArray } from 'formik';

import { ButtonComponent } from '../button';

import { SymbolConnector } from '../svg/Svg.types';
import { SymbolsProps } from '../../types';

import { EditFromRemoveConnectorStyled, EditFromAddConnectorButton, EditFromElementsStyled, EditFromElementStyled } from './styles';
import { isObjEmpty } from '../../helpers';

// SymbolsProps
type EditFormComponentProps = {
	updateSymbol: (symbol: SymbolsProps) => void;
	formChange: () => void;
};

export const EditFormComponent: FunctionComponent<EditFormComponentProps> = ({ updateSymbol, formChange }): JSX.Element => {
	return (
		<Form onChange={formChange}>
			<EditFromElementStyled>
				<label htmlFor="key">Name: </label>
				<Field type="text" id="key" name="key" required />
			</EditFromElementStyled>
			<EditFromElementStyled>
				<label htmlFor="description">Description: </label>
				<Field type="text" id="description" name="description" required />
			</EditFromElementStyled>
			<EditFromElementStyled>
				<label htmlFor="width">Width: </label>
				<Field type="text" id="width" name="width" required />
			</EditFromElementStyled>
			<EditFromElementStyled>
				<label htmlFor="height">Height: </label>
				<Field type="text" id="height" name="height" required />
			</EditFromElementStyled>
			<EditFromElementStyled>
				<label htmlFor="geometry">Geometry: </label>
				<Field type="text" id="geometry" name="geometry" required />
			</EditFromElementStyled>

			<p>Connectors</p>
			<FieldArray name="connectors">
				{({ push, form }) => {
					const { values, setValues } = form;
					const isConnectorsEmpty = isObjEmpty(values.connectors);
					const filteredConnectors = !isConnectorsEmpty && values.connectors.filter((x: any) => x !== undefined);

					return (
						<>
							{isConnectorsEmpty ? (
								<></>
							) : (
								filteredConnectors.map(({ id }: SymbolConnector, i: number) => (
									<EditFromElementsStyled key={`connector-${i}`}>
										<EditFromElementStyled>
											<label htmlFor="connector-id">Id: </label>
											<Field type="text" id="connector-id" name={`connectors[${i}].id`} required />
										</EditFromElementStyled>
										<EditFromElementStyled>
											<label htmlFor={`connectors[${i}].relativePosition.x`}>Position X: </label>
											<Field
												type="number"
												id={`connectors[${i}].relativePosition.x`}
												name={`connectors[${i}].relativePosition.x`}
												required
											/>
										</EditFromElementStyled>
										<EditFromElementStyled>
											<label htmlFor={`connectors[${i}].relativePosition.y`}>Position Y: </label>
											<Field
												type="number"
												id={`connectors[${i}].relativePosition.y`}
												name={`connectors[${i}].relativePosition.y`}
												required
											/>
										</EditFromElementStyled>
										<EditFromElementStyled>
											<label htmlFor={`connectors[${i}].direction`}>Direction: </label>
											<Field type="number" id={`connectors[${i}].direction`} name={`connectors[${i}].direction`} required />
										</EditFromElementStyled>

										<EditFromRemoveConnectorStyled
											type="button"
											onClick={() => {
												// if (form.values && isObjEmpty(form.values.connectors)) {
												const updatedConnectors = values.connectors.filter(
													(connector: SymbolConnector) => connector.id !== id
												);
												const updatedSymbol = { ...values, connectors: updatedConnectors };

												setValues(updatedSymbol);
												updateSymbol(updatedSymbol);
												// };
											}}>
											Remove Connector
										</EditFromRemoveConnectorStyled>
									</EditFromElementsStyled>
								))
							)}
							<EditFromAddConnectorButton>
								<ButtonComponent
									isWide
									type="button"
									onClick={() => {
										push({
											id: '1',
											relativePosition: {
												x: 0,
												y: 0,
											},
											direction: '90',
										});
									}}>
									Add Connector
								</ButtonComponent>
							</EditFromAddConnectorButton>
						</>
					);
				}}
			</FieldArray>
		</Form>
	);
};
