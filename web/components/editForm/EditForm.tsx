import { FunctionComponent, MutableRefObject } from 'react';
import { Form, Field, FieldArray } from 'formik';

import { ButtonComponent } from '../button';

import { SymbolConnector } from '../svg/Svg.types';
import { ConnectorsProps, SymbolsProps } from '../../types';

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
				<label htmlFor="key">Name</label>
				<Field type="text" id="key" name="key" required disabled={hasDisabled} />
			</EditFromElementStyled>

			<EditFromElementStyled>
				<label htmlFor="description">Description</label>
				<Field type="text" id="description" name="description" require disabled={hasDisabled} />
			</EditFromElementStyled>

			<FieldArray name="connectors">
				{({ push, form }) => {
					const { values, setValues, errors } = form;
					const isConnectorsEmpty = isObjEmpty(values.connectors);
					const filteredConnectors = !isConnectorsEmpty && (values.connectors.filter((x: ConnectorsProps) => x !== undefined) as any);
					return (
						<>
							{isConnectorsEmpty ? (
								<></>
							) : (
								<>
									<p>Connectors</p>
									{filteredConnectors.map(({ id }: SymbolConnector, i: number) => (
										<EditFromElementsStyled key={`connector-${i}`} ref={(ref) => (refs.current[id] = ref)}>
											{/* ConnectorId */}
											<EditFromElementStyled>
												<label htmlFor={`connectors[${i}].id`}>Name</label>
												<Field
													type="text"
													id={`connectors[${i}].id`}
													name={`connectors[${i}].id`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectors[${i}].id`] && (
												<ErrorMessageStyled>
													{/* Workaraund, cayse ErrorMessage can't handel name in `connectors[${i}].name` format */}
													{/* @ts-ignore next-line */}
													{errors[`connectors[${i}].id`]}
												</ErrorMessageStyled>
											)}

											{/* RelativePosition X */}
											<EditFromElementStyled>
												<label htmlFor={`connectors[${i}].relativePosition.x`}>Position X</label>
												<Field
													type="number"
													id={`connectors[${i}].relativePosition.x`}
													name={`connectors[${i}].relativePosition.x`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>

											{errors[`connectors[${i}].relativePosition.x`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectors[${i}].relativePosition.x`]}
												</ErrorMessageStyled>
											)}

											{/* RelativePosition Y */}
											<EditFromElementStyled>
												<label htmlFor={`connectors[${i}].relativePosition.y`}>Position Y</label>
												<Field
													type="number"
													id={`connectors[${i}].relativePosition.y`}
													name={`connectors[${i}].relativePosition.y`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectors[${i}].relativePosition.y`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectors[${i}].relativePosition.y`]}
												</ErrorMessageStyled>
											)}

											{/* Direction */}
											<EditFromElementStyled>
												<label htmlFor={`connectors[${i}].direction`}>Direction</label>
												<Field
													type="number"
													id={`connectors[${i}].direction`}
													name={`connectors[${i}].direction`}
													required
													disabled={hasDisabled}
												/>
											</EditFromElementStyled>
											{errors[`connectors[${i}].direction`] && (
												<ErrorMessageStyled>
													{/* @ts-ignore next-line */}
													{errors[`connectors[${i}].direction`]}
												</ErrorMessageStyled>
											)}

											{!hasDisabled && (
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
