import { Field, Form, Formik, FormikErrors, FormikProps } from 'formik';
import { ConnectorsProps } from '../../types';
import {
	ButtonsWrapperConnectorStyled,
	ConnectorModulContainer,
	ConnectorModulFromStyled,
	ConnectorModulFromWrapper,
	EditConnectorElementStyled,
	ErrorMessageStyled,
} from './styles';
import { useRef, useState } from 'react';
import { isObjEmpty } from '../../helpers';

import Trash from '../../svg/trash.svg';
import Save from '../../svg/check-circle.svg';
import Cancel from '../../svg/delete-circle.svg';

type ConnectorModulProps = {
	x: number;
	y: number;
	data: ConnectorsProps;
	disabledForm: boolean;
	updateConnector: (val: ConnectorsProps) => void;
	onDelete: (val: ConnectorsProps) => void;
	onResetPanel: () => void;
};

export const ConnectorModulComponent = ({ x, y, data, disabledForm, updateConnector, onResetPanel, onDelete }: ConnectorModulProps) => {
	const [formErrors, setFormErrors] = useState({});

	const formRef = useRef<FormikProps<any>>(null);

	const onFormChange = () => {
		const timer = setTimeout(() => {
			if (!formRef.current) return;

			console.log(18, formRef.current.values);
			updateConnector(formRef.current.values);
			// updateCurrentSymbol(formRef.current.values);
		}, 1);

		return () => {
			clearTimeout(timer);
		};
	};

	const onFormDelete = () => {
		const timer = setTimeout(() => {
			if (!formRef.current) return;

			console.log(19, 'onFormDelete:', formRef.current.values);
			onDelete(formRef.current.values);
			// updateCurrentSymbol(formRef.current.values);
		}, 1);

		return () => {
			clearTimeout(timer);
		};
	};

	return (
		<ConnectorModulContainer top={y} left={x}>
			<ConnectorModulFromStyled disabled={disabledForm}>
				<ConnectorModulFromWrapper disabled={disabledForm}>
					<Formik
						// enableReinitialize={enableReinitialize}
						// For symbol swithching
						enableReinitialize={true}
						initialTouched={{ key: true }}
						innerRef={formRef}
						initialValues={{ ...data }}
						validate={({ direction, relativePosition }) => {
							const errors: FormikErrors<any> = {};

							// if (item.name === undefined || item.name === '') {
							// 	errors[`connectors[${i}].name`] = 'Name is required';
							// }
							if (typeof relativePosition.x !== 'number') {
								errors.x = 'Position X is required';
							}
							if (typeof relativePosition.y !== 'number') {
								errors.y = 'Position Y is required';
							}
							if (typeof direction !== 'number' || direction < 0 || direction > 360) {
								errors.direction = 'Direction is required and must be between 0 and 360';
							}

							setFormErrors(errors);

							console.log(989, 'errors:', errors);
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								setSubmitting(false);
								console.log('⚡️', 'onSubmin connector value:', values);
							}, 400);
						}}>
						<Form onChange={onFormChange}>
							<EditConnectorElementStyled>
								<label htmlFor="direction">Direction</label>
								<Field type="number" id="direction" name="direction" required disabled={disabledForm} />
							</EditConnectorElementStyled>
							{formErrors.direction && <ErrorMessageStyled>{formErrors.direction}</ErrorMessageStyled>}

							<EditConnectorElementStyled>
								<label htmlFor="relativePosition.x">Position x</label>
								<Field type="number" id="relativePosition.x" name="relativePosition.x" required disabled={disabledForm} />
							</EditConnectorElementStyled>
							{formErrors.x && <ErrorMessageStyled>{formErrors.x}</ErrorMessageStyled>}

							<EditConnectorElementStyled>
								<label htmlFor="relativePosition.y">Position y</label>
								<Field type="number" id="relativePosition.y" name="relativePosition.y" required disabled={disabledForm} />
							</EditConnectorElementStyled>
							{formErrors.y && <ErrorMessageStyled>{formErrors.y}</ErrorMessageStyled>}

							<ButtonsWrapperConnectorStyled>
								{/* <button aria-label="Submit" type="submit" disabled={!isObjEmpty(formErrors)} onClick={() => onSave()}><Save /></button> */}
								<button aria-label="Cancel" type="reset" onClick={() => onResetPanel()}>
									<Cancel />
								</button>
								<button aria-label="Delete" type="button" onClick={() => onFormDelete()}>
									<Trash />
								</button>
							</ButtonsWrapperConnectorStyled>
						</Form>
					</Formik>
				</ConnectorModulFromWrapper>
				{/* <EditFromButtonsWrapper>
					{!disabledForm && (
						<PanelDetailsButtons>
							<ButtonComponent size="s" type="submit" onClick={() => onSubmitForm()} hasError={hasFormError}>
								Save
							</ButtonComponent>
							<ButtonComponent size="s" onClick={() => onResetPanel()} appearance="secondary">
								Cancel
							</ButtonComponent>
						</PanelDetailsButtons>
					)}
				</ConnectorModulFromWrapper> */}
			</ConnectorModulFromStyled>
		</ConnectorModulContainer>
	);
};
