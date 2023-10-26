import { FunctionComponent, MutableRefObject } from 'react';
import { Form, Field, FieldArray } from 'formik';

import { ButtonComponent } from '../button';

import { ConnectorsProps, SymbolsProps } from '../../types';

import {
	EditFromRemoveConnectorStyled,
	EditFromAddConnectorButton,
	EditFromElementsStyled,
	EditFromElementStyled,
	ErrorMessageStyled,
} from './styles';

// SymbolsProps
type EditFormComponentProps = {
	addNewConnector: () => void;
	updateSymbol: (symbol: SymbolsProps) => void;
	hasDisabled: boolean;
	formChange: () => void;
	refs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
};

export const EditFormComponent: FunctionComponent<EditFormComponentProps> = ({
	addNewConnector,
	updateSymbol,
	hasDisabled,
	formChange,
	refs,
}): JSX.Element => {
	return (
		<Form onChange={formChange}>
			<EditFromElementStyled>
				<label htmlFor="identifier">Name</label>
				<Field type="text" id="identifier" name="identifier" required disabled={hasDisabled} />
			</EditFromElementStyled>

			<EditFromElementStyled>
				<label htmlFor="description">Description</label>
				<Field type="text" id="description" name="description" require disabled={hasDisabled} />
			</EditFromElementStyled>

			<FieldArray name="connectors">
				{({ push, form }) => {
					const { values, setValues, errors } = form;
					const isConnectorsEmpty = values.connectionPoints <= 0;
					console.log(19, values);
					const filteredConnectors = !isConnectorsEmpty && (values.connectionPoints.filter((x: ConnectorsProps) => x !== undefined) as any);
					return (
						<>
							{isConnectorsEmpty ? (
								<></>
							) : (
								<>
									<p>Connectors</p>
									{console.log(201, filteredConnectors)}
									{filteredConnectors.map(({ identifier }: ConnectorsProps, i: number) => (
										<EditFromElementsStyled key={`connectionPoints-${i}`} ref={(ref) => (refs.current[identifier] = ref)}>
											{/* ConnectorId */}
											<EditFromElementStyled>
												<label htmlFor={`connectionPoints[${i}].identifier`}>Name</label>
												<Field
													type="text"
													id={`connectionPoints[${i}].identifier`}
													name={`connectionPoints[${i}].identifier`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectionPoints[${i}].identifier`] && (
												<ErrorMessageStyled>
													{/* Workaraund, cause ErrorMessage can't handel name in `connectors[${i}].name` format */}
													{/* @ts-ignore next-line */}
													{errors[`connectionPoints[${i}].identifier`]}
												</ErrorMessageStyled>
											)}

											{/* RelativePosition X */}
											<EditFromElementStyled>
												<label htmlFor={`connectionPoints[${i}].position.x`}>Position X</label>
												<Field
													type="number"
													id={`connectionPoints[${i}].position.x`}
													name={`connectionPoints[${i}].position.x`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>

											{errors[`connectionPoints[${i}].position.x`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectionPoints[${i}].position.x`]}
												</ErrorMessageStyled>
											)}

											{/* RelativePosition Y */}
											<EditFromElementStyled>
												<label htmlFor={`connectionPoints[${i}].position.y`}>Position Y</label>
												<Field
													type="number"
													id={`connectionPoints[${i}].position.y`}
													name={`connectionPoints[${i}].position.y`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectionPoints[${i}].position.y`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectionPoints[${i}].position.y`]}
												</ErrorMessageStyled>
											)}

											{/* Direction */}
											<EditFromElementStyled>
												<label htmlFor={`connectionPoints[${i}].direction`}>Direction</label>
												<Field
													type="number"
													id={`connectionPoints[${i}].direction`}
													name={`connectionPoints[${i}].direction`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectionPoints[${i}].direction`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectionPoints[${i}].direction`]}
												</ErrorMessageStyled>
											)}

											{!hasDisabled && (
												<EditFromRemoveConnectorStyled
													type="button"
													onClick={() => {
														// if (form.values && isObjEmpty(form.values.connectors)) {
														const updatedConnectors = values.connectionPoints.filter(
															(connector: ConnectorsProps) => connector.identifier !== identifier
														);
														const updatedSymbol = { ...values, connectionPoints: updatedConnectors };

														setValues(updatedSymbol);
														updateSymbol(updatedSymbol);
														// };
													}}>
													Remove Connector
												</EditFromRemoveConnectorStyled>
											)}
										</EditFromElementsStyled>
									))}
								</>
							)}

							{!hasDisabled && (
								<EditFromAddConnectorButton>
									<ButtonComponent isWide type="button" onClick={() => addNewConnector()}>
										Add Connector
									</ButtonComponent>
								</EditFromAddConnectorButton>
							)}
						</>
					);
				}}
			</FieldArray>
		</Form>
	);
};
