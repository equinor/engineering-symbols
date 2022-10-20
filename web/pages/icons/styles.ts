import styled from 'styled-components';

export const IconsHeaderStyled = styled.div`
	padding: 1rem 0 4rem;
	width: 100%;
`;

export const IconsSearchStyled = styled.div`
	span {
		background: ${({ theme }) => theme.body};
		border: 1px solid ${({ theme }) => theme.hover.body};
	}

	input::placeholder {
		color: ${({ theme }) => theme.text} !important;
	}

	svg {
		fill: ${({ theme }) => theme.text};
	}
`;

export const IconsContainerStyled = styled.div`
	padding: 2rem 0;
	// justify-content: space-between;
	// display: flex;
	display: grid;
	// grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 15% 60% 25%;
	// gap: 1rem;
`;

export const CategoriesStyled = styled.ul`
	// width: 20%;
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

export const IconsListStyled = styled.ul`
	// width: 55%;
	list-style: none;
	display: grid;
	padding-left: 0;
	margin: 0;
	// grid-template-rows: repeat(auto-fill, 175px);
	// grid-template-rows: max-content 175px;
	grid-template-rows: repeat(fit-content(175px));
	// grid-template-columns: repeat(auto-fill, minmax(130px, auto));
	grid-template-columns: repeat(4, minmax(130px, 1fr));
	gap: 1rem;
	// height: 100%;

	button {
		appearance: none;
		border: 0;
		margin: 0;
		padding: 0;
		border-radius: 0;
		background: none;
		height: 100%;
		width: 100%;
	}

	li {
		// align-items: center;
		// height: auto;
	}

	button > div {
		cursor: pointer;
		height: 100%;
		width: 100%;
		background: ${({ theme }) => theme.body};
		box-shadow: ${({ theme }) => theme.boxShadow};

		&:hover svg {
			transform: scale(1.1);
		}
	}

	svg {
		transition: transform 0.3s ease;
	}

	li p {
		text-align: center;
		word-wrap: break-word;
	}
`;

export const IconsListWrapStyled = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	height: 100%;

	#Annotations > * {
		fill: none;
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

export const IconWrapperStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 0 0 0.5rem;

	svg {
		transition: all 0.3s easy;
	}
`;
