import styled from 'styled-components';

export const IconsHeaderStyled = styled.div`
	padding: 1rem 0 4rem;
	width: 100%;
`;

export const IconsContainerStyled = styled.div`
	padding: 2rem 0;
	display: grid;
	grid-template-columns: 75% 25%;
	min-height: 100vh;
`;

export const IconSelectWrapperStyled = styled.div`
	display: flex;
	border-radius: 12px;
	border: 1px solid #f2f2f2;
	position sticky;
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

export const IconInputsWrapperStyled = styled.div`
	// margin: 0 0 1rem 1rem;

	width: 100%;
	display: flex;

	& > div {
		width: 100%;
	}

	span {
		background: ${({ theme }) => theme.body};
	}

	input::placeholder {
		color: ${({ theme }) => theme.text} !important;
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

export const IconsListStyled = styled.div`
	ul {
		list-style: none;
		display: grid;
		padding-left: 0;
		margin: 0;
		grid-template-rows: repeat(fit-content(150px));
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}

	ul + p {
		padding-top: 3rem;
	}

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

	button > div {
		cursor: pointer;
		height: 150px;
		width: 100%;
		background: ${({ theme }) => theme.body};
		border: 1px solid #f2f2f2;
		border-radius: 12px;
		// box-shadow: ${({ theme }) => theme.boxShadow};

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

export const IconCategoryName = styled.p`
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

export const IconsListWrapStyled = styled.div`
	padding: 0.5rem;
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
