import styled from 'styled-components';

export const SymbolsHeaderStyled = styled.div`
	padding: 1rem 0 2rem;
	width: 100%;
	font-family: 'Equinor';
	text-align: center;
	color: ${({ theme }) => theme.text};

	h1 {
		font-size: 36px;
		font-style: bold;
		padding: 0 0 1rem;
		height: 3rem;
	}

	p {
		font-size: 16px;
		font-style: italic;
		max-width: 55rem;
		margin: 0 auto;
	}
`;

export const SymbolsContainerStyled = styled.div`
	padding: 2rem 0;
	display: grid;
	/* grid-template-columns: 75% 25%; */
	min-height: 100vh;
`;

export const SymbolSelectWrapperStyled = styled.div`
	display: flex;
	border-radius: 12px;
	border: 1px solid #f2f2f2;
	position: sticky;
	top: 1rem;
	margin-bottom: 2rem;
	padding: 1rem;
	background: ${({ theme }) => theme.body};
	z-index: 10;

	& > div:nth-child(1) {
		border-right: 1px solid #f2f2f2;
	}

	& > div:nth-child(2) {
		margin-left: 1rem;

		svg {
			display: flex;
			margin: auto 10px auto auto;
			fill: #6f6f6f;
		}
	}

	input {
		box-shadow: none;
	}
`;

export const SymbolInputsWrapperStyled = styled.div`
	width: 100%;
	display: flex;

	& > div {
		width: 100%;
	}

	span {
		background: ${({ theme }) => theme.body};
	}

	input {
		&::placeholder {
			color: ${({ theme }) => theme.text} !important;
		}

		/* &:focus {
			border-color: red;
			box-shadow: none;
		} */
	}

	svg {
		fill: ${({ theme }) => theme.text};
	}
`;

export const CategoriesStyled = styled.ul`
	padding: 0 1rem 0 0;
	list-style: none;
	margin: 0;

	button {
		width: 100%;

		& > span {
			display: flex;
			justify-content: space-between;
		}
	}

	li span {
		white-space: nowrap;
	}
`;

export const SymbolsListStyled = styled.ul`
	list-style: none;
	display: grid;
	padding-left: 0;
	margin: 0;
	grid-template-rows: repeat(fit-content(150px));
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 1rem;
`;

export const SymbolCategoryName = styled.p`
	display: flex;
	align-items: center;
	padding-bottom: 0.5rem;

	&:after {
		margin-left: 1rem;
		content: '';
		height: 1px;
		flex: 1 1 0%;
		background: #f2f2f2;
		width: 100%;
	}
`;

export const CustomizeColorWrapStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0 0;

	p {
		padding: 0 0 0.75rem;
	}
`;
