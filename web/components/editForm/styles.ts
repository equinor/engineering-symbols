import styled from 'styled-components';

interface PanelDetailsStyledProps {
	isShow: boolean;
}

export const ErrorMessageStyled = styled.div`
	color: ${({ theme }) => theme.textRed};
	font-family: 'Equinor';
	font-size: 12px;
	padding: 0 0 12px;
	transition: all 0.5s ease;
	text-align: right;
`;

export const EditFromElementStyled = styled.div`
	/* padding: 0 0 1rem; */
	// display: grid;
	// grid-template-rows: 40px 10px;
	// grid-template-columns: 110px 1fr;
	padding-bottom: 1rem;

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
		}
	}
`;

export const EditFromAddConnectorButton = styled.div`
	margin-top: 1rem;
	button {
		margin: 0;
	}
`;

export const EditFromElementsStyled = styled.div`
	/* padding: 0 0 2rem; */
	padding: 1rem 0;
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
