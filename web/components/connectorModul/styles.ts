import styled from 'styled-components';

interface ConnectorModulProps {
	top: number;
	left: number;
}

interface EditFromStyledProps {
	disabled: boolean;
}

export const ConnectorModulContainer = styled.div<ConnectorModulProps>`
	position: absolute;
	border: 1px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	background: ${({ theme }) => theme.body};
	border-radius: 12px;
	padding: 1.5rem 1.5rem;
	/* overflow-x: hidden;
	overflow-y: hidden; */
	z-index: 100;
	top: ${({ top }) => `${top}px`};
	left: ${({ left }) => `${left}px`};
`;

export const ConnectorModulFromStyled = styled.div<EditFromStyledProps>`
	/* margin: ${({ disabled }) => (disabled ? '0' : '-5rem 0 -2rem')}; */
	/* margin: -5rem 0 -2rem; */

	form {
		/* padding: ${({ disabled }) => (disabled ? '0' : '0 0 1rem')}; */
		/* padding: 0 0 6rem; */
	}
`;

export const ConnectorModulFromWrapper = styled.div<EditFromStyledProps>`
	position: relative;
	z-index: 10;
	/* height: ${({ disabled }) => (disabled ? '395px' : '335px')}; */
	/* overflow: visible; */
`;

export const EditConnectorElementStyled = styled.div`
	/* padding: 0 0 1rem; */
	display: grid;
	grid-template-rows: 40px 10px;
	grid-template-columns: 110px 1fr;

	label {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: ${({ theme }) => theme.textBlackGrey};
		font-family: 'Equinor';
	}

	input {
		border: 1px solid ${({ theme }) => theme.textGrey};
		padding: 0.5rem 1rem;
		/* margin: 0 0 0 0.5rem; */
		width: 100%;
		border-radius: 5px;
		background: transparent;

		&:disabled {
			opacity: 0.8;
		}
	}
`;

export const ButtonsWrapperConnectorStyled = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;

	button {
		appearance: none;
		background: transparent;
		padding: 0;
		margin: 0;
		border: none;
		border-radius: 12px;
		/* background: ${({ theme }) => theme.backgroundGrey}; */
		transition: background 0.3s ease, transform 0.3s ease;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;

		&:disabled {
			opacity: 0.6;
		}

		&::before {
			content: attr(aria-label);
			position: absolute;
			top: -13px;
			right: -36px;
			font-size: 12px;
			color: ${({ theme }) => theme.textBlackGrey};
			font-family: 'Equinor';
			border: 1px solid ${({ theme }) => theme.backgroundGrey};
			box-shadow: ${({ theme }) => theme.boxShadow};
			background: ${({ theme }) => theme.body};
			border-radius: 12px;
			line-height: 1;
			padding: 2px 5px;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		&:not(:disabled):hover {
			background: ${({ theme }) => theme.backgroundGrey};
			transform: scale(1.1);

			&::before {
				opacity: 1;
				transition-delay: 1s;
			}
		}
	}

	button:nth-child(1) {
		&:not(:disabled):hover {
			/* background: ${({ theme }) => theme.textRed}; */
			svg {
				stroke: ${({ theme }) => theme.teal};
			}
		}
	}

	button:nth-child(3) {
		&:hover {
			/* background: ${({ theme }) => theme.textRed}; */
			svg {
				stroke: ${({ theme }) => theme.textRed};
			}
		}
	}

	button + button {
		margin-left: 0.6rem;
	}

	svg {
		fill: none;
		stroke: ${({ theme }) => theme.fill};
		width: 1.3rem;
	}
`;

export const ErrorMessageStyled = styled.div`
	color: ${({ theme }) => theme.textRed};
	font-family: 'Equinor';
	font-size: 12px;
	padding: 0 0 12px;
	transition: all 0.5s ease;
	text-align: right;
`;
