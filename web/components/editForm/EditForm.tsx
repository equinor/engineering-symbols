import { FunctionComponent, useState } from 'react';
import { Form, Field, FieldArray } from 'formik';

import { ButtonComponent } from '../button';

import { SymbolConnector } from '../svg/Svg.types';
import { ConnectorsProps, SymbolsProps } from '../../types';

import { EditFromRemoveConnectorStyled, EditFromAddConnectorButton, EditFromElementsStyled, EditFromElementStyled } from './styles';
import { isObjEmpty } from '../../helpers';

// SymbolsProps
type EditFormComponentProps = {
	updateSymbol: (symbol: SymbolsProps) => void;
	formChange: () => void;
};

export const EditFormComponent: FunctionComponent<EditFormComponentProps> = ({ updateSymbol, formChange }): JSX.Element => {
	const [currentConnectorId, setCurrentConnectorId] = useState<number>(0);

	// const getConnectorIdWithHighestNumber = (connectors: ConnectorsProps[]) => {
	// 	const sortedConnectors = connectors.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

	// 	return Number(sortedConnectors[sortedConnectors.length - 1].id);
	// }

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

			<p>Connectors</p>
			<FieldArray name="connectors">
				{({ push, form }) => {
					const { values, setValues } = form;
					const isConnectorsEmpty = isObjEmpty(values.connectors);
					const filteredConnectors = !isConnectorsEmpty && (values.connectors.filter((x: ConnectorsProps) => x !== undefined) as any);

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
										{/* <EditFromElementStyled>
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
										</EditFromElementStyled> */}

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
										setCurrentConnectorId(currentConnectorId + 1);
										push({
											id: currentConnectorId.toString(),
											relativePosition: {
												x: 0,
												y: 0,
											},
											direction: 0,
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
