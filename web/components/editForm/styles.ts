import styled from 'styled-components';

interface EditFromElementsProps {
	selected: boolean;
}

export const ErrorMessageStyled = styled.div`
	color: ${({ theme }) => theme.textRed};
	font-family: 'Equinor';
	font-size: 12px;
	padding: 12px 0 0;
	transition: all 0.5s ease;
	text-align: right;
`;

export const EditFromElementStyled = styled.div`
	/* padding: 0 0 1rem; */
	// display: grid;
	// grid-template-rows: 40px 10px;
	// grid-template-columns: 110px 1fr;
	padding-bottom: 1rem;
	position: relative;

	label {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: ${({ theme }) => theme.textBlackGrey};
		font-family: 'Equinor';
		padding-bottom: 0.4rem;
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
			border: none;
			border-bottom: 1px solid ${({ theme }) => theme.textGrey};
		}
	}
`;

export const EditFromWrapperStyled = styled.div`
	margin: 0 1rem;
`;

export const EditFromAddConnectorButton = styled.div`
	margin-top: 1rem;
	button {
		margin: 0;
	}
`;

export const EditFromVarsStyled = styled.div`
	position: absolute;
	top: 27px;
	right: 5px;

	button {
		margin: 0 0 0 6px;
		cursor: pointer;
		width: 32px;
		appearance: none;
		padding: 5px;
		background-color: ${({ theme }) => theme.backgroundGrey};
		color: ${({ theme }) => theme.text};
		font-size: 13px;
		border: none;
		border-radius: 5px;
		transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;

		&:hover {
			transform: translateY(-2px);
		}

		&:active {
			background-color: ${({ theme }) => theme.textBlackGrey};
			color: ${({ theme }) => theme.textWhite};
		}
	}
`;

export const EditFromElementsStyled = styled.div<EditFromElementsProps>`
	/* padding: 0 0 2rem; */
	padding: 0.5rem 0;
	margin: 0.5rem 0;
	position: relative;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	/* grid-template-rows: repeat(4, 1fr); */
	grid-column-gap: 10px;
	grid-row-gap: 0;

	& > * {
		grid-column: span 2;

		&:nth-child(3),
		&:nth-child(4) {
			grid-column: span 1;
		}
	}

	&::before {
		content: '';
		position: absolute;
		top: -0.5rem;
		left: -0.8rem;
		padding: 0 0.8rem 1rem;
		width: 100%;
		height: 100%;
		transition: background 0.3s ease;
		background: ${({ theme, selected }) => (selected ? theme.backgroundGrey : 'transperent')};
		z-index: -1;
		border-radius: 5px;
	}
`;

export const EditFromRemoveConnectorStyled = styled.button`
	appearance: none;
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.textRed};
	cursor: pointer;
	margin: 0 0 0 auto;
	display: flex;

	&:disabled {
		opacity: 0.8;
		cursor: default;
	}
`;
